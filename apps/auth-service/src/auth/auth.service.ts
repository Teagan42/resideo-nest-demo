import { Injectable } from '@nestjs/common';
import { Credentials } from './credentials/credentials';

@Injectable()
export class AuthService<CredentialType extends Credentials> {

  constructor(
  ) {
  }

  async login(credentials: CredentialType): Promise<any> {
  }

  async resetPassword(): Promise<void> {
    // TODO
  }

  async logout(): Promise<void> {
  }
}
