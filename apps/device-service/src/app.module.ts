import { Module } from '@nestjs/common';
import {
  LoggerModule,
  LoggerProvider,
} from '@resideo-nest/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';

@Module({
          imports: [
            LoggerModule.build("Device Service"),
            DevicesModule
          ],
          controllers: [AppController],
          providers: [
            AppService
          ],
        })
export class AppModule {
}
