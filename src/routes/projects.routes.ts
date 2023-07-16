import { Router,Request,Response } from "express";
import projectContr from "../controller/project.contr.js";
let{addProject}=projectContr
let app = Router()
app.post("/",addProject) 
// app.get("/:id", (req: Request, res: Response) => {
     
//  })


export default app