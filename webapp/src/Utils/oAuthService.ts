/* eslint-disable @typescript-eslint/camelcase */
import { OAuthConfig } from "src/shared/config";
import { apiUtil } from "@dp-ui/utils";

const POPUP_WIDTH = 400;
const POPUP_HEIGHT = 426;
const ACCESS_TOKEN_SWIGGY_AZURE_EVENT = "ACCESS_TOKEN_SWIGGY_AZURE_EVENT";

export class OAuthService {
  private config = OAuthConfig;

  public makeAuthUrl() {
    const queryParams = apiUtil.formQueryString(
      new Map([
        ["client_id", this.config.CLIENT_ID],
        [
          "redirect_uri",
          `${window.location.origin}${this.config.OAUTH_REDIRECT_URI}`
        ],
        ["response_type", "token id_token"],
        ["scope", "openid email profile"],
        [
          "nonce",
          Math.random()
            .toString(36)
            .substring(7)
        ]
      ])
    );
    return `${this.config.OAUTH_LOGIN_ENPOINT}/authorize?${queryParams}`;
  }

  public launchPopup() {
    const left = window.screen.width / 2 - POPUP_WIDTH / 2,
      top = window.screen.height / 2 - POPUP_HEIGHT / 2;
    const win = window.open(
      this.makeAuthUrl(),
      "Swiggy Login",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        POPUP_WIDTH +
        ", height=" +
        POPUP_HEIGHT +
        ", top=" +
        top +
        ", left=" +
        left
    );
    if (win) win.opener = window;
  }

  public redirectToLogin() {
    window.location.href = this.makeAuthUrl();
  }

  public listenToMessageEvent(resolve, reject) {
    const windowEventHandler = (event: MessageEvent) => {
      let hash = event.data;
      // eslint-disable-next-line no-console
      console.log(hash);
      if (hash.type === ACCESS_TOKEN_SWIGGY_AZURE_EVENT) {
        const token = hash.access_token;
        resolve(token);
      } else if (hash.type == "error") {
        console.error(hash.message);
        reject(hash.message);
      }
      window.removeEventListener("message", windowEventHandler);
    };
    window.addEventListener("message", windowEventHandler, false);
  }

  public findTokenInHash(hash: string): string | null {
    const matchedResult = hash.match(/access_token=([^&]+)/);
    return matchedResult && matchedResult[1];
  }

  public processToken(token, callbackFn: (token: string) => void) {
    if (!window.opener) {
      token && callbackFn(token);
      return;
    }
    if (!token) {
      window.opener.postMessage(
        {
          type: "error",
          message: "No Access Token Found."
        },
        window.location.origin
      );
      window.close();
      return;
    }

    window.opener.postMessage(
      {
        type: ACCESS_TOKEN_SWIGGY_AZURE_EVENT,
        access_token: token
      },
      window.location.origin
    );
    window.close();
  }
}

export default new OAuthService();
