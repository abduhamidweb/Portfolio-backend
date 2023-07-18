import { Router,Request,Response } from "express";
import projectContr from "../controller/project.contr.js";
let{addProject,getProject, putProject , deleteProject}=projectContr
let app = Router()
app.post("/",addProject)
app.put("/:id",putProject)
app.get("/",getProject)
app.delete("/:id",deleteProject)



export default app