import { Router } from "express";

import taskController from "../controllers/taskController.js";

const router = Router();

router.get("/", taskController.getTasks);
router.post("/task", taskController.createTask);
router.delete("/del/:id", taskController.deleteTask);
router.put("/edit/:id", taskController.editTask);

export default router;
