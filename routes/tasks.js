import { Router } from "express";
import { taskController } from "../controllers/task-controller.js";

const router = Router();

router.route('/')
    .get(taskController.index)
    .post(taskController.store);

router.route('/:id')
    .get(taskController.show)
    .patch(taskController.update)
    .delete(taskController.destroy);

export { router as tasks };