import { Router } from "express";
import { CompaniesContr } from "../controller/companies.js";

const router: Router = Router();

router.get('/', CompaniesContr.GetCompanies);
router.get('/:id', CompaniesContr.GetCompanies);


export default router;