const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
  static login(request,response){
    return response.render('auth/login')
  }
  static async loginPost (request, response){
    const {email,password} = request.body
    const user = await User.findOne({where:{email:email}})

    if(!user){
      request.flash('message','Usuário não encontrado')
      response.render('auth/login')
      return
    }

    const passwordMatch = bcrypt.compareSync(password, user.password)

    if(!passwordMatch){
      request.flash('message','Senha inválida')
      response.render('auth/login')
      return
    }

    request.session.userId = user.id
    request.flash('message','Bem vindo')
    request.session.save(()=>{
      response.redirect('/')
    })
  }
  static register(request,response){
    return response.render('auth/register')
  }
  static async registerPost(request,response){
    const {name, email, password, confirmpassword, phone, cep, cpf} = request.body

    if(password != confirmpassword){
      request.flash('message','A senhas não coincidem, tente novamente')
      response.render('auth/register')
      return
    }

    const  checkedIfExists = await User.findOne({where:{email:email}})
    if(checkedIfExists){
      request.flash('message','Email em uso, tente novamente')
      response.render('auth/register')
      return
    }

    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password,salt)

    const user = {
      name,
      email,
      password:hashedPassword,
      phone,
      cep,
      cpf
    }

    try{
      const createdUser = await User.create(user)
      request.session.userId = createdUser.id
      request.flash('message','Cadastro realizado com sucesso')
      request.session.save(()=>{
      })
      response.redirect('/')
    }catch(errro){
      console.log("Erro ao cadastrar", errro);
    }
  }
  static async logout (request,response){
    request.session.destroy()
    return response.redirect('/login')
  } 
  static about(request,response){
    return response.render('screens/about')
  }
  static contact(request,response){
    return response.render('screens/contact')
  }
  static services(request,response){
    return response.render('screens/services')
  }
  static map(request,response){
    return response.render('screens/map')
  }
}