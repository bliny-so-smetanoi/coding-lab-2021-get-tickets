const {Router} = require('express')
const config = require('config')
const Events = require('../models/Events')
const Orders = require('../models/Orders')
const Seats = require('../models/Seats')
const router = Router()
// /api/event/
router.get('/',async (req,res)=>{
    try{

        const events = await Events.find(null, 'name artist image date_time address').sort({date_time: 'ascending'})

        res.json(events)
    }catch(e){
        res.status(500).json({message: 'Cannot get data from cloud, try later...'})
    }
})
// /api/event/:id
router.get('/:id',async (req,res)=>{
    try{
        const id = req.params.id
        const event = await Events.findById(id)
        const eventSeats = await Seats.find({owner: id})
        const result = {event, eventSeats}
        res.json(result)
    }catch(e){
        res.status(500).json({message: 'Cannot get event data from cloud, try later...'})
    }
})
// /api/event/create
router.post('/create', async (req,res)=>{
    try{
        const {newOrder} = req.body
        const {seats} = req.body

        await Seats.deleteMany({owner: seats[0].owner})
        await Seats.insertMany(seats)

        const order = new Orders(newOrder)
        await order.save()

        res.status(200).json({message: 'Purchase proceeded'})

    }catch(e){
     res.status(500).json({message: 'Cannot create order, try later...'})
    }
})
// /api/event/search
router.post('/search', async (req,res)=>{
    try{

        const search = req.body.search.trim()


        if(search === '' || search === 0 || search === search[0]){
            const data = await Events.find(null, 'name artist image date_time address').sort({date_time: 'ascending'})
            res.status(200).json(data)
            return
        }
        const regex = new RegExp(search, "i")

        const searched = await Events.find({artist: regex}).sort({date_time: 'ascending'})

        if(searched === null){
            res.status(404).json({message: 'Error 404, nothing has found'})
            return
        }

        res.status(200).json(searched)


    }catch(e){
        res.status(500).json({message: 'Cannot get request from client'})
    }
})

module.exports = router