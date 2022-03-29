const User =  require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class UserController {
    static showHome(req, res) {
        res.render('users/home')
    }
    
    static login(req, res) {
        res.render('users/login')
    }

    static register(req, res) {
        res.render('users/register')
    }

    static async registerUser(req, res) {
        const {name, email, workShifts, password, confirmPassword} = req.body;
        
        if(password != confirmPassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('users/register')

            return
        }

        const checkIfUserExists = await User.findOne({where: {email: email} })

        if (checkIfUserExists) {
        req.flash('message', 'O e-mail já está em uso!')
        res.render('users/register')

        return
        } 

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            password: hashedPassword,
            email,
            workShifts
        }

        try {
            await User.create(user)

            res.redirect('/')

            req.flash('message', 'Cadastro realizado com sucesso!')
            } catch(err) {
                console.log(err)
        }
    } 
}
