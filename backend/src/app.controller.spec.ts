import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';


describe('AppController', () => {
  let AppController;
  let AppService;


  beforeEach(() => {
    AppService = new AppService();
    AppController = new AppController(AppService);
  });

  

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(AppService, 'findAll').mockImplementation(() => result);

      expect(await AppController.findAll()).toBe(result);
    });
  });
});
