#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(IOSAppTracking, "IOSAppTracking",
           CAP_PLUGIN_METHOD(getTrackingStatus, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getAdvertisingIdentifier, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(requestPermission, CAPPluginReturnPromise);
)
