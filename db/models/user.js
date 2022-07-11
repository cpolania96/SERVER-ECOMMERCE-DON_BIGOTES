import { mongoose } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true,
        default: "https://cloudinary.com/console/c-8d8767bba1e2f9d99db3329c7917e8/media_library/folders/home/asset/ea82ecf225e1ea3680745e828d14994c/manage/analysis"
    }
}, {
    timestamp: true
})
userSchema.methods.matchPassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified) next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})



const User = mongoose.model('User', userSchema)

export default User