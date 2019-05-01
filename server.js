        require('dotenv').config();
        const express = require('express');
        const app = express();
        const port = process.env.PORT
        const Company = require('./models/company');
        const Car = require('./models/car');
        const Driver = require('./models/driver');
        const ejs = require('ejs');
        const methodOverride = require('method-override')
        const mongoose = require('mongoose')

        mongoose.connect('mongodb://localhost/driver_management', {useNewUrlParser: true})
        .then(() => console.log('mongodb running'),
        (err) => console.log(err))

        app.set('view engine', 'ejs');
        app.use(express.urlencoded({extended:false}));
        // app.use(express.static('public'));
        app.use(methodOverride('_method'));

        //COMPANY INDEX
        app.get('/companies', (req, res) => {
            Company.find()
            .then((company)=>{
            res.render('index', { company })
            }).catch(err => console.log(err))
        })
        //COMPANY NEW
        app.get('/companies/new', (req, res) => {
            res.render('new')
        })
        //COMPANY POST
        app.post('/companies', (req, res) => {
            let data = {
                name : req.body.name,
                logo : req.body.logo,
                address: req.body.address,
                city: req.body.city,
                telephone: req.body.telephone
            }
            let company = new Company(data)
            company.save()
            .then(()=> {
            res.redirect('/companies')
            }).catch(err => console.log(err))
        })
    //COMPANY SHOW
    app.get('/companies/:indexOfCompaniesArray', (req, res) => {
        Company.findById(req.params.indexOfCompaniesArray)
        .populate({ path: 'cars', select: 'name' })
        .populate({ path: 'drivers', select: 'name' })

        .then(company => {
        res.render('companies/show', {company} )
            })
        })
//DRIVER INDEX
app.get('/drivers', (req, res) => {
    Driver.find()
    .then((driver)=>{
    res.render('index', { driver })
    }).catch(err => console.log(err))
})
//DRIVER NEW
app.get('/drivers/new', (req, res) => {
    Car.find()
    .then ( cars => {
      console.log(cars);
      res.render('drivers/new', {cars} )
  
    })
})
//DRIVER POST
app.post('/drivers', (req, res) => {
    // let data = {
    //     name : req.body.name,
    //     age : req.body.age,
    //     image: req.body.image
    // }
    let driver = new Driver (req.body)
    let cars = req.body.arrayOfCars
    if (Array.isArray(cars)) {
        cars.forEach(carId => {
            driver.cars.push(carId)
            })
        } else {
            driver.cars.push(carId)
        }
    driver.save()
    .then(()=> {
    res.redirect('/drivers')
    }).catch(err => console.log(err))
})

// res.send(req.body)

//DRIVER SHOW
//DRIVER EDIT
//DRIVER UPDATE
//DRIVER DELETE




//CAR INDEX
app.get('/cars', (req, res) => {
    Car.find()
    .then((car)=>{
    res.render('index', { car })
    }).catch(err => console.log(err))
})

        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })

//CAR NEW

app.get('/cars/new', (req, res) => {
    res.render('new')
})