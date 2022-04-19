const Event = require('../models/Event')
const User = require('../models/User')



module.exports = class EventController {
    static async showAllEvents(req, res) {
        const userId = req.session.userid

            const user = await User.findOne({
                where: { 
                    id: id
                }, 
                include: Event,
                plain: true,
            })

            const events = user.Events.map((result) => result.dataValues)



            res.render('events/showEvent', {events})
    }

        
        static async eventInformation(req, res) {
        
            const id = req.params.id
    
            const events = await Event.findOne({
                where: { 
                    id: id 
                },
                     raw: true, 
                     plain: true
            })
    
            if(typeof events.items != 'object'){
               events.items = JSON.parse(events.items)
            }
    
            res.render('events/views', {events})
    
    }

    static async createEvent(req, res) {
        res.render('events/add')
    }

    static async createEventSave(req, res) {

        const event = {
            UserId: req.session.userid,
            name: req.body.name,
            city: req.body.city,
            private: false,
            items: req.body.items,
            image: req.file.filename,
            description: req.body.description
        }

        if(!req.file.filename) {
            req.flash('message', 'Por favor inserir uma imagem do evento!')
            res.render('events/add')

            return
        }

         if(!event.name && !event) {
            req.flash('message', 'Usuário em branco, tente novamente!')
            res.render('events/add')

            return
        }

        if(!event.city) {
            req.flash('message', 'É necessario inserir uma cidade!')
            res.render('events/add')

            return
        }

        try {
            await Event.create(event) //

            req.flash('message', 'Evento anunciado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
            } catch (err) {
                console.log('Erro:' + err)
            }
        }

        static async showEvent(req, res) {

            const userId = req.session.userid

            const user = await User.findOne({
                where: { 
                    id: userId
                }, 
                include: Event,
                plain: true,
            })
            const events = user.Events.map((result) => {
               console.log(typeof result.dataValues.items)
               if(typeof result.dataValues.items!='object'){
                  result.dataValues.items = JSON.parse(result.dataValues.items)
               }
               return result.dataValues
            })

            res.render('events/showEvent', {events})
        }

        static async removeEvent(req, res) {

            const id = req.body.id
            const UserId = req.session.userid

            try {
                await Event.destroy({where: {id: id, UserId: UserId}})

                req.flash('message', 'Evento excluido com sucesso!')
                    
                req.session.save(() => {
                res.redirect('/events/showEvent')
                
            })
                } catch(error) {    
                    console.log('Aconteceu um erro' + error)
            }
        }
    }