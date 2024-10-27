const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:false
    }
})

const Task = mongoose.model("Task",TaskSchema);

module.exports = Task;