import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types/api';
import { carFeatures, getFeaturesByCategory } from '../data/features.data';
import { CarFeature } from '../types/car.types';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;
  
  let features = carFeatures;
  
  if (category && typeof category === 'string') {
    features = getFeaturesByCategory(category as CarFeature['category']);
  }
  
  const response: ApiResponse<CarFeature[]> = {
    success: true,
    data: features,
    message: `${features.length} Ausstattungsmerkmale verfügbar`,
  };
  
  res.status(200).json(response);
});

export default router;
