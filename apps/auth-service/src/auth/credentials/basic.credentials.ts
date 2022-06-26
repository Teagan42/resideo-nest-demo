import { Credentials } from './credentials';

export interface BasicCredentials extends Credentials {
  username: string;
  password: string;
}
