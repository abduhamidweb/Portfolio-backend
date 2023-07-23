import { Router } from "express";
import { CompaniesContr } from "../controller/companies.js";
import authMiddleware from "../middleware/auth.js";

const router: Router = Router();

router.get('/', CompaniesContr.GetCompanies);
router.get('/:id', CompaniesContr.GetCompanies);
router.post('/', authMiddleware, CompaniesContr.PostCompany);
router.put('/:id', authMiddleware, CompaniesContr.putCompany);
router.delete('/:id', authMiddleware, CompaniesContr.deleteCompany);



export default router;