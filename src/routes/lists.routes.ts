import { Router, Request, Response } from "express";
import ListContr from "../controller/list.contr.js";
let { addLists, getList, putList, deleteList } = ListContr;
let app = Router();
app.post("/", addLists);
app.get("/:id", getList);
app.put("/:id", putList);
app.delete("/:id", deleteList);

export default app;
