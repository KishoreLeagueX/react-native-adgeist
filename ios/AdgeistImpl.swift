import Foundation
import AdgeistCreatives
import React

@objc public class AdgeistImpl: NSObject {
    private static let adGeist = AdGeistCore.shared

    @objc public func fetchCreative(
        adSpaceId: String,
        publisherId: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        AdgeistImpl.adGeist.getCreative().fetchCreative(adSpaceId: adSpaceId, publisherId: publisherId) { creativeData in
            if let creativeData = creativeData {
                do {
                    let encoder = JSONEncoder()
                    let data = try encoder.encode(creativeData)
                    if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                        resolve(json)
                    } else {
                        reject("JSON_ERROR", "Failed to convert ad data to JSON", nil)
                    }
                } catch {
                    reject("JSON_ERROR", "Failed to encode ad data", error)
                }
            } else {
                reject("NO_AD", "Ad data not available", nil)
            }
        }
    }

    @objc public func sendCreativeAnalytic(
        campaignId: String,
        adSpaceId: String,
        publisherId: String,
        eventType: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        AdgeistImpl.adGeist.postCreativeAnalytics().sendTrackingData(
            campaignId: campaignId,
            adSpaceId: adSpaceId,
            publisherId: publisherId,
            eventType: eventType
        ) { response in
            if let response = response {
                resolve(response)
            } else {
                reject("NO_AD", "Couldn't find the campaign to update analytics", nil)
            }
        }
    }

    @objc public static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
