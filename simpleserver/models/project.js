var mongoose = require('mongoose')
var Schema = mongoose.Schema
/**
 * project schema
 */
var projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  date_created: { type: Date, default: new Date() },
  startDate: { type: Date},
  endDate: { type: Date },
  clients: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  createdBy: { type: String }
})
module.exports = mongoose.model('project', projectSchema)
