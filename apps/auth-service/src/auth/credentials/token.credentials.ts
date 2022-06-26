import { Credentials } from './credentials';

export interface AccessTokenCredentials extends Credentials {
  accessToken: string;
}

export interface RefreshTokenCredentials extends Credentials {
  refreshToken: string;
}
