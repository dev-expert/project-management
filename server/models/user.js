var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt');

/**
 * user schema
 */
var userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  date_created: { type: Date, default: new Date() },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['ADMIN', 'CLIENT', 'USER'], uppercase: true, default: 'ADMIN' },
  createdBy: { type: String }
})
userSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(user.password, 10);
      this.password = hash;
      next();
    }
);
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);  
    return compare;
}
module.exports = mongoose.model('user', userSchema)
