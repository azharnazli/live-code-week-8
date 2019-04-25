const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate :  [{
      validator: function(value) {
        return User.findOne({
          email  : value,
          _id : {
            $ne :  this.id
          }
        })
          .then((found) => {
            if(found) return false
          })
      }, message : 'email already registered'
    },{
      validator : function(value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(value).toLocaleLowerCase())
      },
      message: `email format error`
    }]
  },
  password: {
    type: String,
    required: [true, 'please insert your password']
  }
})

UserSchema.pre('save', function(next){
  this.password = hash(this.password)
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User