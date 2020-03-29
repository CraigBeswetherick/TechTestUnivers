import { isMobileDevice } from "src/shared/utils";
import OAuthService from "./oauth.service";

const USER_AVATAR = "";

const AZURE_PROVIDER = "https://login.microsoftonline.com";

export type AuthError = {
  message: string;
};

type PromisedResponseError<R, E = AuthError> = Promise<{
  response?: R;
  error?: E;
}>;

export enum UXType {
  POPUP,
  REDIRECTION
}

interface IAuthService {
  authenticate: () => PromisedResponseError<string | null>;
  authenticateUsingOAuth: ({ uxType: UXType }) => Promise<string | void>;
  determineOAuthUXType: () => UXType;
  getExistingStoredCredentials: () => PromisedResponseError<CredentialType | null>;
  isCredentialsApiSupported: boolean;
  storeFederatedCredentials?: () => PromisedResponseError<CredentialType>;
}

export class AuthService implements IAuthService {
  public get isCredentialsApiSupported() {
    return Boolean(navigator.credentials && window.FederatedCredential);
  }

  public getExistingStoredCredentials = async () => {
    try {
      const response = await navigator.credentials.get({
        federated: { providers: [AZURE_PROVIDER] },
        mediation: "required"
      });
      return { response };
    } catch (e) {
      console.error("Error while retrieving credentials", e);
      return { error: e };
    }
  };

  public async authenticate() {
    const uxType = this.determineOAuthUXType();
    try {
      const response = await this.authenticateUsingOAuth({ uxType });
      if (!response) {
        throw "No message received";
      }
      return { response };
    } catch (e) {
      return { error: { message: e } };
    }
  }

  public determineOAuthUXType() {
    return isMobileDevice() ? UXType.REDIRECTION : UXType.POPUP;
  }

  public async authenticateUsingOAuth({ uxType }) {
    switch (uxType) {
      case UXType.POPUP: {
        OAuthService.launchPopup();
        return new Promise<string>((resolve, reject) => {
          OAuthService.listenToMessageEvent(resolve, reject);
        });
      }
      case UXType.REDIRECTION: {
        OAuthService.redirectToLogin();
        return Promise.resolve("Redirected to Login Page");
      }
      default:
        return Promise.reject("Wrong UXType passed");
    }
  }

  public storeCredentials = async ({ emailId, name }) => {
    const credentials = new window.FederatedCredential({
      id: emailId,
      provider: AZURE_PROVIDER,
      name: name,
      iconURL: USER_AVATAR
    });

    return await navigator.credentials.store(credentials);
  };
}

export default new AuthService();
