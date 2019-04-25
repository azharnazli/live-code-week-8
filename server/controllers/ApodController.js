const axios = require('axios')
const Apods = require('../models/apods')

class ApodController{

  static async getApod(req, res) {
    try {
      let {data} = await axios({
        url: `https://api.nasa.gov/planetary/apod?date=${req.body.date.slice(0,10)}&api_key=${process.env.API_KEY}`,
        method: 'Get',
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        }
      })
      data.owner = req.authenticated._id
      let apods  = await  Apods.create(data)
      res.status(200).json(apods)
    } catch (error) {
      res.status(500).json(error)
    }

  }

  static async getMyApod(req, res) {
    try {
     let data = await Apods.find({
        owner: req.authenticated._id
      })
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async myApod(req, res) {
    try {
      let data = await Apods.findById(req.params.id)
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async deleteApod(req, res) {
    try {
      let data = await Apods.findByIdAndDelete(req.params.id)
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = ApodController