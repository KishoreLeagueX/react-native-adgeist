import {
  type ConfigPlugin,
  createRunOncePlugin,
  withPlugins,
} from '@expo/config-plugins';

import { withRNAdgeistMainActivity } from './withRNAdgeistMainActivity';

/**
 * So, expo config plugin are awesome and the documentation is well written, but I still needed to look around to see
 * how other projects actually modify the AppDelegate. I've found react-native-firebase to implement a plugin config
 * that changes the AppDelegate, so I'll leave their link as reference:
 * https://github.com/invertase/react-native-firebase/blob/main/packages/app/plugin/src/ios/appDelegate.ts
 *
 * Kudos to them, because this stuff is hard!
 *
 * @param config
 */
const withRNAdgeist: ConfigPlugin = (config) => {
  return withPlugins(config, [withRNAdgeistMainActivity]);
};

const pak = require('react-native-adgeist/package.json');
export default createRunOncePlugin(withRNAdgeist, pak.name, pak.version);
