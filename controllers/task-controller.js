import { asyncWrapper } from '../middlewares/async.js';
import Task from '../models/Task.js'
import { createCustomError } from '../errors/custom.js';

const index = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({});
    return res.status(200).json({ data: tasks });
});

const store = asyncWrapper(async (req, res, next)  => {
    const task = await Task.create(req.body, {
        new: true,
        runValidators: true,
    });
    return res.status(201).json({
        data: {
            success: true,
            message: "Created successfully.",
            task,
        }
    });
});

const show = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params;
    const task = await Task.findById(taskId);
    if (! task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404));
    }
    return res.status(200).json({ data: task });
});

const update = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
        runValidators: true,
    });
    if (! task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404));
    }
    return res.status(201).json({
        data: {
            success: true,
            message: "Updated successfully.",
            task,
        }
    });
});

const destroy = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    if (! task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404));
    }
    return res.status(201).json({
        data: {
            success: true,
            message: "Deleted successfully.",
        }
    });
});

export const taskController = { index, store, show, update, destroy };