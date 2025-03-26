package com.adgeist

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.facebook.react.bridge.ReactApplicationContext
import com.adgeistcreatives.AdGeistSDK
import com.google.gson.Gson
import com.facebook.react.bridge.Promise

@ReactModule(name = AdgeistModule.NAME)
class AdgeistModule(reactContext: ReactApplicationContext) :
  NativeAdgeistSpec(reactContext), TurboModule {

  private val adGeist = AdGeistSDK.initialize(reactContext.applicationContext)
  private val getAd = adGeist.getCreative()

  override fun getName(): String {
    return NAME
  }

  override fun fetchCreative(adSpaceId: String, publisherId: String, promise: Promise) {
      getAd.fetchCreative(adSpaceId, publisherId) { adData ->
          if (adData != null) {
              val json = Gson().toJson(adData)
              promise.resolve(json)
          } else {
              promise.reject("NO_AD", "Ad data not available")
          }
      }
  }

  companion object {
    const val NAME = "Adgeist"
  }
}