import { Router } from 'express';
import LaptopController from './laptop.controller';
import LaptopService from './laptop.service';

const laptopRouter = Router();

const laptopService = new LaptopService();
const laptopController = new LaptopController(laptopService);

laptopRouter.get('/laptops/', laptopController.getLaptops);

export default laptopRouter;
