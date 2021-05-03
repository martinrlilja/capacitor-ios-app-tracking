import { WebPlugin } from "@capacitor/core";
import { IOSAppTrackingPlugin, AppTrackingAuthorizationStatus } from "./definitions";

export class IOSAppTrackingWeb extends WebPlugin implements IOSAppTrackingPlugin {
  constructor() {
    super({
      name: "IOSAppTracking",
      platforms: ["web", "android"],
    });
  }

  async getTrackingAuthorizationStatus(): Promise<{ status: AppTrackingAuthorizationStatus }> {
    return {
      status: AppTrackingAuthorizationStatus.NotSupported,
    };
  }

  async getAdvertisingIdentifier(): Promise<{ identifier: string }> {
    return {
      identifier: "00000000-0000-0000-0000-000000000000",
    };
  }

  async requestTrackingAuthorization(): Promise<{ status: AppTrackingAuthorizationStatus }> {
    return {
      status: AppTrackingAuthorizationStatus.NotSupported,
    };
  }
}

const IOSAppTracking = new IOSAppTrackingWeb();

export { IOSAppTracking };

import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(IOSAppTracking);
