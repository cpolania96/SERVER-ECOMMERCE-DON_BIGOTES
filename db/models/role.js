import pkg from 'mongoose'
const {mongoose, model} = pkg

const roleSchema = mongoose.Schema({
        name: String
    },
    {
        versionKey: false
    })

export default model("Role", roleSchema)