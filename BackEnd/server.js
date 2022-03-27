const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require("cors")


// App config
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
dotenv.config({ path: './config.env' })


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, () => console.log("MongoDB connected"))

const reminderSchema = new mongoose.Schema({
    reminderMsg: String,
    remindAt: String,
    isReminded: Boolean
})
const ReminderModel = new mongoose.model("reminder", reminderSchema)






//API routes
app.get("/getAllReminder", (req, res) => {

    ReminderModel.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })

})

app.post("/addReminder", (req, res) => {
    const { reminderMsg, remindAt } = req.body

    const reminder = new ReminderModel({
        reminderMsg,
        remindAt,
        isReminded: false
    })

    reminder.save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })

})

app.post("/deleteReminder", (req, res) => {

    ReminderModel.deleteOne({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })

})


app.listen(process.env.PORT, () => console.log(`Server run op port ${process.env.PORT}`))