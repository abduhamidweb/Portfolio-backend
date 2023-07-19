import { Request, Response } from 'express';
import portfolioSchema from '../schemas/portfolio.schema.js';
import { JWT } from '../utils/jwt.js';
class PortfolioController {
    async createUser(req: Request, res: Response) {
        try {
            let token: any = req.headers.token;
            const userId = JWT.VERIFY(token).id;
            const portfolio = new portfolioSchema({ user: userId });
            await portfolio.save();
            res.status(201).json({
                success: true,
                data: portfolio
            });
        } catch (error) {
            console.log('error :', error);
            res.status(500).json({ error: 'Portfolio qo\'shishda xatolik yuz berdi', message: error });
        }
    }
    async getPortfolio(req: Request, res: Response) {
        try {
            const portfolio = await portfolioSchema.find().populate('user');
            
            res.send(portfolio);
        } catch (error) {
            console.log('error :', error);
            res.status(500).json({ error: 'Portfolio olishda xatolik yuz berdi' });
        }
    }
    async getPortfolioById(req: Request, res: Response) {
        try {
            const portfolio = await portfolioSchema.findById(req.params.id).populate('user');
            res.json(portfolio);
        } catch (error) {
            console.log('error :', error);
            res.status(500).json({ error: 'Portfolio olishda xatolik yuz berdi' });
        }
    }
}
export default new PortfolioController();