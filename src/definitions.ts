declare module "@capacitor/core" {
  interface PluginRegistry {
    IOSAppTracking: IOSAppTrackingPlugin;
  }
}

export enum AppTrackingAuthorizationStatus {
  /**
   * The value returned if the user authorizes access to app-related data that
   * can be used for tracking the user or the device.
   *
   * Read more: https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus
   */
  Authorized = "authorized",

  /**
   * The value returned if the user denies authorization to access app-related data that can be used for tracking the user or the device.
   *
   * Read more: https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus
   */
  Denied = "denied",

  /**
   * The value returned if a user has not yet received a request to authorize access to app-related data that can be used for tracking the user or the device.
   *
   * Read more: https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus
   */
  NotDetermined = "notDetermined",

  /**
   * The value returned if authorization to access app-related data that can be used for tracking the user or the device is restricted.
   *
   * Read more: https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus
   */
  Restricted = "restricted",

  /**
   * The value returned if AppTrackingTransparency is not supported on the device,
   * for instance on iOS <14.0, Android or Web.
   */
  NotSupported = "notSupported",

  /**
   * The value returned if this plugin doesn't understand the value returned from
   * AppTrackingTransparency.
   *
   * This could happen if a new version of iOS adds a new status value.
   */
  Unknown = "unknown",
}

export interface IOSAppTrackingPlugin {
  /**
   * Get the current authorization status.
   *
   * Returns `AppTrackingAuthorizationStatus.NotSupported` on iOS <14.0, Android and Web.
   *
   * Read more: https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/3547038-trackingauthorizationstatus
   */
  getTrackingAuthorizationStatus(): Promise<{ status: AppTrackingAuthorizationStatus }>;

  /**
   * Include the AdSupport framework in the app if you need access to the advertising identifier.
   *
   * Returns an zeroed out UUID if the user denied authorization, or on Android or the Web.
   *
   * Read more: https://developer.apple.com/documentation/adsupport/asidentifiermanager/1614151-advertisingidentifier
   */
  getAdvertisingIdentifier(): Promise<{ identifier: string }>;

  /**
   * Request authorization from the user to track them.
   *
   * Returns `AppTrackingAuthorizationStatus.NotSupported` on iOS <14.0, Android and Web,
   * without asking the user for consent.
   *
   * Read more: https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/3547037-requesttrackingauthorization
   */
  requestTrackingAuthorization(): Promise<{ status: AppTrackingAuthorizationStatus }>;
}
