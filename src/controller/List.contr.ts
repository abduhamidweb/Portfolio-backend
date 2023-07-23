import { Request, Response } from "express";
import ListSchema from "../schemas/List.schema.js";
import ProjectData from "../schemas/sections/Projects/ProjectData.schema.js";

let Project = ProjectData;
let List = ListSchema;

interface ListInterface {
  id: string;
  listText: string;
  section: "project" | "experience";
  field: "aboutInfo" | "technology";
}

async function postList(
  id: string,
  listText: string,
  section: "project" | "experience",
  field: "aboutInfo" | "technology"
) {
  let dbName = section == "project" ? ProjectData : ProjectData;

  let addedData = await List.create({ listText });

  await dbName.updateOne(
    { _id: id },
    {
      $push: { [field]: addedData._id },            
    }
  );

  return addedData;
}

export default {
  async POST(req: Request, res: Response) {
    try {
      let { listText, section, id, field } = req.body;

      if (!section || !id || !listText || !field) {
        throw new Error("Invalid data");
      }

      const projectDATA = await Project.findById(id);
      if (!projectDATA) throw new Error("Invalid id");
      let addedData = await postList(id, listText, section, field);

      res.send({
        message: "Successfuly added data",
        data: addedData,
      });
    } catch (error: any) {
      res.status(400).send({
        message: `Error: ${error.message}`,
      });
    }
  },

  async GET(req: Request, res: Response) {
      try {
        console.log(await List.find());
        
      const id: string = req.params.id;
      const list = await List.findById(id);
      if (!list) {
        throw new Error("Invalid id");
      }
      res.json({
        data: list,
      });
    } catch (error: any) {
      res.status(400).json({
        message: `Error: ${error.message}`,
      });
    }
  },
  async PUT(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const { listText } = req.body;

      if (!listText) {
        throw new Error("Invalid data");
      }

      const updatedList = await List.findByIdAndUpdate(
        id,
        { listText },
        { new: true }
      );

      if (!updatedList) {
        throw new Error("Invalid id");
      }

      res.json({
        status: 200,
        success: true,
        message: "List updated",
        data: updatedList,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },

  async DELETE(req: Request, res: Response) {
    try {
      const listId: string = req.params.id;

      const deletedList = await List.findByIdAndDelete(listId);

      if (!deletedList) {
        throw new Error("Invalid id");
        }

        deleteList(deleteList,"project","aboutInfo")
     

      res.json({
        status: 200,
        success: true,
        message: "List deleted",
      });
    } catch (error: any) {
      res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
      });
    }
  },
};


async function deleteList(deletedList:any,
  section: "project" | "experience",
  field: "aboutInfo" | "technology"
) {
let dbName = section == "project" ? ProjectData : ProjectData;

  const relatedProjectsId = await dbName.distinct("_id", {
    [field]: deletedList._id,
  });

  if (relatedProjectsId) {
    await dbName.updateOne(
      { _id: relatedProjectsId },
      { $pull: { [field]: deletedList._id } }
    );
  } else {
      throw new Error('Invalid id')
  }
}

// async function findInfo(id: string){
//     let p1 = await Project.exists({ aboutInfo:id });
//     let p2 = await Project.exists({ technology: id });
//     //EXP 
//     let e1 = await Project.exists({ aboutInfo: id });
//     let e2 = await Project.exists({ technology: id });

//     let db = p1 ? Project : Project
//     let field = 
// }
