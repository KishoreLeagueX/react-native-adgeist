import {
  type ConfigPlugin,
  type ExportedConfigWithProps,
  withAppBuildGradle,
  withMainActivity,
} from '@expo/config-plugins';
import {
  type ApplicationProjectFile,
  type GradleProjectFile,
} from '@expo/config-plugins/build/android/Paths';
import { mergeContents } from '@expo/config-plugins/build/utils/generateCode';

export const withRNAdgeistMainActivity: ConfigPlugin = (config) => {
  return withAppBuildGradle(
    withMainActivity(config, readMainActivityFileAndUpdateContents),
    readBuildGradleFileAndUpdateContents
  );
};

// 1. MainActivity Modifications
async function readMainActivityFileAndUpdateContents(
  config: ExportedConfigWithProps<ApplicationProjectFile>
): Promise<ExportedConfigWithProps<ApplicationProjectFile>> {
  const { modResults: mainActivityFile } = config;

  const worker = getCompatibleFileUpdater(mainActivityFile.language);
  mainActivityFile.contents = worker(mainActivityFile.contents);

  return config;
}

function readBuildGradleFileAndUpdateContents(
  config: ExportedConfigWithProps<GradleProjectFile>
) {
  const { modResults } = config;

  if (!modResults.contents.includes('implementation "ai.adgeist:adgeistkit:')) {
    modResults.contents = modResults.contents.replace(
      /dependencies\s*{/,
      `dependencies {
        implementation "ai.adgeist:adgeistkit:+" // AdgeistKit Dependency`
    );
  }

  return config;
}

function getCompatibleFileUpdater(
  language: ApplicationProjectFile['language']
): (originalContents: string) => string {
  switch (language) {
    case 'kt':
      return ktFileUpdater;
    default:
      throw new Error(
        `Cannot add React Native Orientation Director code to MainActivity of language "${language}"`
      );
  }
}

export function ktFileUpdater(originalContents: string): string {
  // Safer anchor detection
  const anchors = [
    /super\.onCreate\(/,
    /@Override\s+fun onCreate\(/,
    /class \w+ : ReactActivity/,
  ].find((anchor) => anchor.test(originalContents));

  if (!anchors) {
    throw new Error('Could not find suitable insertion point in MainActivity');
  }

  const libraryImportCodeBlock = 'import com.adgeist.AdgeistModule';
  const rightBeforeClassDeclaration = /import com\.facebook\.react/g;

  const importMergeResults = mergeContents({
    tag: '@react-native-adgeist/library-import',
    src: originalContents,
    newSrc: libraryImportCodeBlock,
    anchor: rightBeforeClassDeclaration,
    offset: 0,
    comment: '// React Native Adgeist',
  });

  const onConfigurationChangedCodeBlock = `AdgeistModule.initialize(this)\n`;
  const rightAfterOnCreate = /super\.onCreate\(/g;

  const implementationMergeResults = mergeContents({
    tag: '@react-native-adgeist/init',
    src: importMergeResults.contents,
    newSrc: onConfigurationChangedCodeBlock,
    anchor: rightAfterOnCreate,
    offset: 1,
    comment: '// AdgeistKit Initialization',
  });

  return implementationMergeResults.contents;
}
