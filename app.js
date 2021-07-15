const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
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

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.get('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', {campground});
})

app.post('/campgrounds', async (req, res) => {
    const { campground } = req.body;
    const newCampground = new Campground({...campground});
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`);
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id);
    res.render('campgrounds/edit', {campground});
})

app.patch('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const {campground} = req.body;
    const updatedCampground = await Campground.findByIdAndUpdate(id, {...campground}, {new: true});
    res.redirect(`/campgrounds/${updatedCampground._id}`);
})

app.delete('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})





app.listen(3000, () => {
    console.log('Listening to Port 3000...');
})