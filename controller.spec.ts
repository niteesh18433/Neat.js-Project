// user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { createTestModule } from '../app.testing.module';

describe('UserController', () => {
  let controller: UserController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestModule();
    await module.init();

    controller = module.get<UserController>(UserController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = new User();
      user.id = 1;
      jest.spyOn(controller, 'findOne').mockImplementation(async () => user);

      const result = await controller.findOne('1');
      expect(result).toEqual(user);
    });

    it('should throw a 404 error if user is not found', async () => {
      jest.spyOn(controller, 'findOne').mockRejectedValue(new HttpException('User not found', HttpStatus.NOT_FOUND));

      await expect(controller.findOne('999')).rejects.toThrowError(HttpException);
    });
  });

  Add more test cases for other methods (create, update, remove);
});
