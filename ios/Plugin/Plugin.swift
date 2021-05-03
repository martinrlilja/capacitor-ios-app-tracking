import Foundation
import Capacitor
import AppTrackingTransparency

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(IOSAppTracking)
public class IOSAppTracking: CAPPlugin {

    @objc func getTrackingAuthorizationStatus(_ call: CAPPluginCall) {
        if #available(iOS 14.0, *) {
            let status = AuthorizationStatus.from(status: ATTrackingManager.trackingAuthorizationStatus)
            call.success([ "status": status.rawValue ])
        } else {
            call.success([ "status": AuthorizationStatus.notSupported.rawValue ])
        }
    }

    @objc func getAdvertisingIdentifier(_ call: CAPPluginCall) {
        // Conditionally load the AdSupport framework. Apple might reject binaries that
        // include AdSupport but doesn't specify that they use the advertising identifier/IDFA.
        //
        // Based on the solution here: https://flint.tools/blog/finding-a-weak-linking-solution.html
        guard let managerClass = NSClassFromString("ASIdentifierManager") as? NSObject.Type else {
            call.success([ "identifier": "00000000-0000-0000-0000-000000000000" ])
            return
        }

        let selector = NSSelectorFromString("advertisingIdentifier")
        guard let method = managerClass.method(for: selector) else {
            call.success([ "identifier": "00000000-0000-0000-0000-000000000000" ])
            return
        }

        let manager = managerClass.init()

        typealias FuncType = @convention(c) (AnyObject, Selector) -> UUID
        let function = unsafeBitCast(method, to: FuncType.self)
        let advertisingIdentifier = function(manager, selector)

        call.success([ "identifier": advertisingIdentifier.uuidString ])
    }

    @objc func requestTrackingAuthorization(_ call: CAPPluginCall) {
        if #available(iOS 14.0, *) {
            ATTrackingManager.requestTrackingAuthorization { (result) in
                let status = AuthorizationStatus.from(status: result)
                call.success([ "status": status.rawValue ])
            }
        } else {
            call.success([ "status": AuthorizationStatus.notSupported.rawValue ])
        }
    }

    enum AuthorizationStatus: String {
        case authorized = "authorized"
        case denied = "denied"
        case notDetermined = "notDetermined"
        case restricted = "restricted"
        case notSupported = "notSupported"
        case unknown = "unknown"

        @available(iOS 14.0, *)
        static func from(status: ATTrackingManager.AuthorizationStatus) -> Self {
            switch status {
            case .authorized:
                return .authorized
            case .denied:
                return .denied
            case .notDetermined:
                return .notDetermined
            case .restricted:
                return .restricted
            default:
                return .unknown
            }
        }
    }

}
