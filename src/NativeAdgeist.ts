import type { TurboModule } from 'react-native';
import { NativeModules, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  fetchCreative(adSpaceId: string, publisherId: string): Promise<Object>;
  sendCreativeAnalytic(
    campaignId: string,
    adSpaceId: string,
    publisherId: string,
    eventType: string
  ): Promise<Object>;
}

export default TurboModuleRegistry.get<Spec>('Adgeist') ||
  NativeModules.Adgeist;
