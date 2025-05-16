import type { TurboModule } from 'react-native';
import { TurboModuleRegistry, Platform } from 'react-native';

export interface Spec extends TurboModule {
  fetchCreative(adSpaceId: string, publisherId: string): Promise<Object>;
  sendCreativeAnalytic(
    campaignId: string,
    adSpaceId: string,
    publisherId: string,
    eventType: string
  ): Promise<Object>;
}

const AdgeistModule = Platform.select({
  android: TurboModuleRegistry.getEnforcing<Spec>('Adgeist'),
  default: {
    fetchCreative: () => Promise.resolve({}),
    sendCreativeAnalytic: () => Promise.resolve({}),
  } as Spec,
}) as Spec;
export default AdgeistModule;
