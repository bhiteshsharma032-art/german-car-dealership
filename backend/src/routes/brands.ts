import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types/api';
import { brands, getBrandById } from '../data/brands.data';
import { Brand } from '../types/car.types';
import { createError } from '../middleware/errorHandler';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const response: ApiResponse<Brand[]> = {
    success: true,
    data: brands,
    message: `${brands.length} Marken verfügbar`,
  };
  
  res.status(200).json(response);
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const brand = getBrandById(id);

  if (!brand) {
    throw createError('Marke nicht gefunden', 404);
  }

  const response: ApiResponse<Brand> = {
    success: true,
    data: brand,
  };

  res.status(200).json(response);
});

export default router;
