const User =  require('../models/User')
const Event = require('../models/Event')

const bcrypt = require('bcryptjs')


module.exports = class UserController {
    static async showHome(req, res) {
        const eventsData = await Event.findAll({
            include: User,
        })

        const events = eventsData.map((result => result.get({plain: true})))
        res.render('users/home', { events })
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
        const {name, email, password, passwordMatch} = req.body;
        
        if (password != passwordMatch) {
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
            email
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


    static async updateUser(req, res) {
        
            const id = req.params.id

            const users = await User.findOne({where: { id: id }, raw: true })

            res.render('users/edit', {users})

    }

    static async updateUserSave(req, res) {
        const userId = req.session.userid 

        const user = {
            name: req.body.name,
            email: req.body.email
        }

        try {
            await User.update(user, {where: { id: userId }, raw: true })

            req.flash('message', 'Dados atualizados com sucesso!')
            
            req.session.save(() => {
                res.redirect('/')
            })
        } catch(error) {    
            console.log('Aconteceu um erro' + error)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}