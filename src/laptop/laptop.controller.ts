import LaptopService from './laptop.service';
import { Request, Response } from 'express';

class LaptopController {
  private laptopService: LaptopService;

  constructor(laptopService: LaptopService) {
    this.laptopService = laptopService;
  }

  getLaptops = async (req: Request, res: Response) => {
    try {
      const laptops = await this.laptopService.retrieveLaptops();
      res.status(200).json(laptops);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default LaptopController;
