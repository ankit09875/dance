const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyparser = require("body-parser");

// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    //   await mongoose.connect('mongodb://127.0.0.1:27017/Dancecontact');
    await mongoose.connect('mongodb+srv://ankitnonpur:wEO6AEETYLB2l3vx@cluster0.9hrlknv.mongodb.net/Dancecontact').then(() => { console.log("connected to database") }).catch(() => { console.log("some error ocuured while connecting database") })

}

const port = 80;
// useing schema
const contactSchema = new mongoose.Schema({
    Name: String,
    Age: String,
    Gender: String,
    phone: Number,
    Address: String,
    More: String
});
const contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }))
// app.use("/statics", express.static(path.join(__dirname, 'statics')));


app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
// app.locals.basedir = app.get('views');

app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.get('/level', (req, res) => {
    res.status(200).render('level.pug');
});

app.get('/feature', (req, res) => {
    res.status(200).render('level.pug');
});

app.get('/class', (req, res) => {
    res.status(200).render('level.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send(`<h3>thanks for submit we will contact soon..</h3>`)
    }).catch(() => {
        res.status(400).send('submittion failed')
    })

});

app.listen(port, () => {
    console.log(`this server is running on port ${port}`);
});
