const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const app = express();

mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
console.log('mongoose connected');
})
.catch(err => {
    console.log('error')
    console.log(err)
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('index', { campgrounds });
})


app.listen(3000, () => {
    console.log('Listening to Port 3000...');
})