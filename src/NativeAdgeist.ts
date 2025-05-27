import { NativeModules } from 'react-native';
import type { TurboModule } from 'react-native';

let Adgeist: any;
try {
  // Try TurboModule (new arch)
  const { TurboModuleRegistry } = require('react-native');
  Adgeist = TurboModuleRegistry.getEnforcing?.('Adgeist');
} catch (e) {
  // Fallback for old arch
  Adgeist = NativeModules.Adgeist;
}
if (!Adgeist) {
  // Final fallback for old arch
  Adgeist = NativeModules.Adgeist;
}

export interface Spec extends TurboModule {
  fetchCreative(adSpaceId: string, publisherId: string): Promise<Object>;
  sendCreativeAnalytic(
    campaignId: string,
    adSpaceId: string,
    publisherId: string,
    eventType: string
  ): Promise<Object>;
}

export default Adgeist as Spec;
