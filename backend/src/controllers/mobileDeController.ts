import { Request, Response } from 'express';
import mobileDeClient from '../services/mobileDeClient';
import { v4 as uuidv4 } from 'uuid';

export class MobileDeController {
  /**
   * Test mobile.de API connection
   * GET /api/mobilede/test-connection
   */
  async testConnection(req: Request, res: Response) {
    try {
      const result = await mobileDeClient.testConnection();
      
      if (result.success) {
        res.json({
          success: true,
          message: 'Mobile.de Seller-API connection successful',
          sellers: result.data?.sellers || [],
          sellersCount: result.data?.sellers?.length || 0
        });
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          message: 'Mobile.de API connection failed',
          error: result.error
        });
      }
    } catch (error: any) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during API test',
        error: error.message
      });
    }
  }

  /**
   * Get all sellers for this API user
   * GET /api/mobilede/sellers
   */
  async getSellers(req: Request, res: Response) {
    try {
      const result = await mobileDeClient.getSellers();
      
      if (result.success) {
        res.json({
          success: true,
          sellers: result.data || []
        });
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          message: 'Failed to fetch sellers',
          error: result.error
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Get inventory for all sellers or specific seller
   * GET /api/inventory
   * GET /api/inventory?sellerId=123
   */
  async getInventory(req: Request, res: Response) {
    try {
      const sellerId = req.query.sellerId as string;
      
      if (sellerId) {
        // Get ads for specific seller
        const result = await mobileDeClient.getAds(sellerId);
        
        if (result.success) {
          res.json({
            success: true,
            vehicles: result.data || [],
            sellerId,
            total: result.data?.length || 0
          });
        } else {
          res.status(result.error?.status || 500).json({
            success: false,
            message: `Failed to fetch inventory for seller ${sellerId}`,
            error: result.error
          });
        }
      } else {
        // Get all sellers first, then their ads
        const sellersResult = await mobileDeClient.getSellers();
        
        if (!sellersResult.success) {
          return res.status(sellersResult.error?.status || 500).json({
            success: false,
            message: 'Failed to fetch sellers',
            error: sellersResult.error
          });
        }

        const sellers = sellersResult.data || [];
        const allVehicles: any[] = [];
        
        // Fetch ads for each seller
        for (const seller of sellers) {
          const adsResult = await mobileDeClient.getAds(seller.mobileSellerId);
          if (adsResult.success && adsResult.data) {
            allVehicles.push(...adsResult.data.map(ad => ({
              ...ad,
              sellerId: seller.mobileSellerId
            })));
          }
        }

        res.json({
          success: true,
          vehicles: allVehicles,
          sellers: sellers.length,
          total: allVehicles.length
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Create a new ad
   * POST /api/inventory
   */
  async createAd(req: Request, res: Response) {
    try {
      const { sellerId, ...adData } = req.body;
      
      if (!sellerId) {
        return res.status(400).json({
          success: false,
          message: 'sellerId is required'
        });
      }

      // Generate unique insertion request ID for safe retries
      const insertionRequestId = uuidv4();
      
      const result = await mobileDeClient.createAd(sellerId, adData, insertionRequestId);
      
      if (result.success) {
        res.status(201).json({
          success: true,
          message: 'Ad created successfully',
          mobileAdId: result.data?.mobileAdId,
          location: result.data?.location,
          insertionRequestId
        });
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          message: 'Failed to create ad',
          error: result.error
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Update an existing ad
   * PUT /api/inventory/:adId
   */
  async updateAd(req: Request, res: Response) {
    try {
      const { adId } = req.params;
      const { sellerId, ...adData } = req.body;
      
      if (!sellerId) {
        return res.status(400).json({
          success: false,
          message: 'sellerId is required'
        });
      }

      const result = await mobileDeClient.updateAd(sellerId, adId, adData);
      
      if (result.success) {
        res.json({
          success: true,
          message: 'Ad updated successfully',
          ad: result.data
        });
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          message: 'Failed to update ad',
          error: result.error
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Delete an ad
   * DELETE /api/inventory/:adId
   */
  async deleteAd(req: Request, res: Response) {
    try {
      const { adId } = req.params;
      const { sellerId } = req.query;
      
      if (!sellerId) {
        return res.status(400).json({
          success: false,
          message: 'sellerId query parameter is required'
        });
      }

      const result = await mobileDeClient.deleteAd(sellerId as string, adId);
      
      if (result.success) {
        res.status(204).send();
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          message: 'Failed to delete ad',
          error: result.error
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Get a specific ad
   * GET /api/inventory/:adId
   */
  async getAd(req: Request, res: Response) {
    try {
      const { adId } = req.params;
      const { sellerId } = req.query;
      
      if (!sellerId) {
        return res.status(400).json({
          success: false,
          message: 'sellerId query parameter is required'
        });
      }

      const result = await mobileDeClient.getAd(sellerId as string, adId);
      
      if (result.success) {
        res.json({
          success: true,
          ad: result.data
        });
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          message: 'Failed to fetch ad',
          error: result.error
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

export default new MobileDeController();