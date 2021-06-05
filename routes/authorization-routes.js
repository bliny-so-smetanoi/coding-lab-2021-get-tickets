const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Users = require('../models/Users')

const router = Router()
// /api/auth/register
router.post('/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'At least 6 characters').isLength({min: 6}),
        check('name','Name field should not be empty').isLength({min: 1}),
        check('phone', 'Wrong phone number').isLength({min: 11})
        ],
    async (req,res)=>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data!'
            })
        }

        const {name, email, password, phone} = req.body

        const potential = await Users.findOne({email})

        if(potential){
            return res.status(400).json({message: 'This email is already taken!'})
        }

        const hashed = await bcrypt.hash(password, 12)

        const newUser = new Users({name, email, password: hashed, phone})

        await newUser.save()
        res.status(201).json({message: 'User created!'})
    }
    catch (e){
        res.status(500).json({message: 'Something went wrong, please try again...'})
    }
    })
// /api/auth/login
router.post('/login',
    [
        check('email', 'Enter correct email!').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res)=>{
    try{
        const errors = validationResult(req)
        const validErrMessage = "Incorrect email or password!"
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data!'
            })
        }
        const {email, password} = req.body

        const user = await Users.findOne({email})

        if(!user){
            return res.status(400).json({message: validErrMessage})
        }
         const isValid = await bcrypt.compare(password, user.password)

        if(!isValid){
            return res.status(400).json({message: validErrMessage})
        }

        const token = jwt.sign(
            { userID: user.id},
            config.get('jwt'),
            {expiresIn: '1h'}
        )
        res.json({token, userID: user.id})
    }
    catch(e){
        res.status(500).json({message: 'Something went wrong, please try again...'})
    }
    })

module.exports = router