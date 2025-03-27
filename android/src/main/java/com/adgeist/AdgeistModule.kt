package com.adgeist

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.facebook.react.bridge.ReactApplicationContext
import com.adgeistcreatives.AdGeistSDK
import com.google.gson.Gson
import com.facebook.react.bridge.Promise
import android.util.Log

@ReactModule(name = AdgeistModule.NAME)
class AdgeistModule(reactContext: ReactApplicationContext) :
  NativeAdgeistSpec(reactContext), TurboModule {

  private val adGeist = AdGeistSDK.initialize(reactContext.applicationContext)
  private val getAd = adGeist.getCreative()
  private val postCreativeAnalytic = adGeist.postCreativeAnalytics()

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

  override fun sendCreativeAnalytic(campaignId: String, adSpaceId: String, publisherId: String, eventType: String, promise: Promise) {
    postCreativeAnalytic.sendTrackingData(campaignId, adSpaceId, publisherId, eventType) { adData ->
        if (adData != null) {
            Log.d("MyActivity of app module", adData)
            promise.resolve(adData)
        } else {
            promise.reject("NO_AD", "Coudn't find the campaign to update analytics")
        }
    }
  }

  companion object {
    const val NAME = "Adgeist"
  }
}