const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    visitedLocation: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    }
},{ timestamps: true }); 