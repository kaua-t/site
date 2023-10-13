const Comp = require('../models/Companies')
const User = require('../models/User')

module.exports = class homeController{
  static async showHome(request, response){
    return response.render('screens/home')
  }
}