import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types/api';

const router = Router();

interface HealthCheckData {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
}

router.get('/', (req: Request, res: Response) => {
  const healthData: HealthCheckData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
  };

  const response: ApiResponse<HealthCheckData> = {
    success: true,
    data: healthData,
    message: 'Server ist betriebsbereit',
  };

  res.status(200).json(response);
});

export default router;
