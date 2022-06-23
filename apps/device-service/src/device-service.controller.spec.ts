import { Test, TestingModule } from '@nestjs/testing';
import { DeviceServiceController } from './device-service.controller';
import { DeviceServiceService } from './device-service.service';

describe('DeviceServiceController', () => {
  let deviceServiceController: DeviceServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeviceServiceController],
      providers: [DeviceServiceService],
    }).compile();

    deviceServiceController = app.get<DeviceServiceController>(DeviceServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(deviceServiceController.getHello()).toBe('Hello World!');
    });
  });
});
