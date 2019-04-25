const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApodSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  explanation: {
    type: String
  },
  date: {
    type: Date
  },
  url: {
    type: String
  }

})

const Apods = mongoose.model('Apods', ApodSchema)

module.exports = Apods