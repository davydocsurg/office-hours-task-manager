import mongoose, { Document, Schema } from "mongoose";

interface TaskModel extends Document {
    name: string;
    description: string;
    completed: boolean;
}

const TaskSchema: Schema = new Schema<TaskModel>({
    name: {
        type: String,
        required: [true, "Please provide a name for this task."],
        trim: true,
        maxlength: [20, "Name cannot be more than 60 characters"],
    },

    description: {
        type: String,
        required: [true, "Please provide a description for this task."],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model<TaskModel>("Task", TaskSchema);
