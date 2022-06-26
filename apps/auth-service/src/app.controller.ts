import {
  Controller,
  Get,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly authServiceService: AppService) {}

  @Get()
  getHello(): string {
    return this.authServiceService.getHello();
  }
}
