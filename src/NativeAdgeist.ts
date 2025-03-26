import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  fetchCreative(adSpaceId: string, publisherId: string): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Adgeist');
