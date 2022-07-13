import { Module } from '@nestjs/common';
import { LoggerModule } from '@resideo-nest/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
          imports: [
            LoggerModule.build("User Service"),
            UsersModule,
          ],
          controllers: [
            AppController
          ],
          providers: [
            AppService,
          ],
        })
export class AppModule {
}
