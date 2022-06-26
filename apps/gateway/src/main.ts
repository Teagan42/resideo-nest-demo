import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
