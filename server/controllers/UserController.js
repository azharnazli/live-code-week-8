const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')


class UserController{

  static async createUser(req, res) {
    try {
      let users = await User.create(req.body)
      res.status(201).json(users)
    } catch (error) {
      if(error.errors.password) {
        res.status(400).json({message : error.errors.password.message})
      } else if(error.errors.email) {
        res.status(400).json({message : error.errors.email.message})
      }
    }
  }

  static async loginUser(req, res) {
    try {
      let user = await User.findOne({email : req.body.email})
      if(!user) {
          res.status(400).json({message: 'email tidak terdaftar'})
      } else {
        if(!compare(req.body.password, user.password)) {
          res.status(400).json({message: 'Password anda salah'})
        } else {
          let token = sign({
            _id: user._id,
            email: user.email
          })
          res.status(200).json(token)
        }
      }
    } catch (error) {
        res.status(500).json(error)    
    }
  }

}

module.exports = UserController