const User =  require('../models/User')

const bcrypt = require('bcryptjs')


module.exports = class UserController {
    static showHome(req, res) {
        res.render('users/home')
    }
    
    static login(req, res) {
        res.render('users/login')
    }

    static async loginUser(req, res) {
        const {email, password} = req.body

        const user = await User.findOne({where: {email: email} })

        if(!user) {
            req.flash('message', 'Usuário não encontrado, tente novamente!')
            res.render('users/login')

        return 
    }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
            req.flash('message', 'Senha inválida, tente novamente!')
            res.render('users/login')
            

            return 
        }

        req.session.userid = user.id
        req.flash('message', 'Login realizado com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
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

        User.create(user)
        .then((user) => {
        // initialize session
            req.session.userid = user.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
            res.redirect('/')
            })
        })
        .catch((err) => console.log(err))
    } 


    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}
