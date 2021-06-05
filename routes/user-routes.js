const {Router} = require('express')
const auth = require('../middleware/authorization-middleware')
const Users = require('../models/Users')
const Orders = require('../models/Orders')
const Feedback = require('../models/Feedback')
const router = Router()

// /api/userdata/
router.get('/', auth, async (req, res) =>{
    try{
        const id = req.user.userID

        const userInfo = await Users.findById(id, 'name phone email')
        const orderInfo = await Orders.find({owner: id}).sort({date_time: 'descending'})

        res.json({userInfo, orderInfo})
    }
    catch(e){
        res.status(500).json({message: 'Cannot get user data from cloud, try later...'})
    }
} )

// /api/userdata/feedback
router.post('/feedback', async(req,res)=>{
    try{
        const {name, text} = req.body

        const feedback = new Feedback({
            name: name,
            text: text,
            time: Date.now()
        })

        await feedback.save()

        res.json({message: 'Feedback successfully delivered!'})
    }catch(e){
        res.status(500).json({message: 'Error: cannot send feedback from client . . .'})
    }
})
module.exports = router