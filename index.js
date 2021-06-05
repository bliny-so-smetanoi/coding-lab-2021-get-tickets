const mongo = require("mongoose")
const express = require("express")
const config = require("config")
const chalk = require('chalk')
const Event = require('./models/Events')
const {Types} = require('mongoose')
const path = require('path')
const Seats = require('./models/Seats')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/authorization-routes'))
app.use('/api/event', require('./routes/event-routes'))
app.use('/api/userdata', require('./routes/user-routes'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 80

async function start(){
    try{
        console.log(chalk.bgBlue.cyan("Starting..."))
        console.log(chalk.bgYellowBright.black("Connecting to database..."))
        await mongo.connect(config.get("mongoURI"),{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=>console.log(chalk.bgGreenBright.black(`Server has been started successfully at PORT: ${PORT};`)))
    }catch(e){
        console.error("Error (Server):", e.message)
        process.exit(1)
    }
}

async function insDoc(){
    Event.insertMany([
        {
            name: "World's Little Blurry",
            artist: 'Billie Eilish',
            image: 'sss',
            date_time: Date.now(),
            address: 'Zhongshan Park Music Hall, Beijing, China',
            description: "Wolrd tour by Billie Eilish Pirate Baird O'Connell"
        }
    ])

}


start()
// insDoc()
