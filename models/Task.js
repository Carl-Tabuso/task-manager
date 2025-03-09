import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true,
        maxlength: [100, 'Max length is only 100.'],
        minlength: [3, 'Minimum length of 1 character.'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

export default model('Task', TaskSchema);