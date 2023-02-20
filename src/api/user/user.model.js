const moongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = moongoose.Schema

const userSchema = new Schema(
  {
    user: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const User = moongoose.model('users', userSchema)
module.exports = User
