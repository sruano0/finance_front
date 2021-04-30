//create a Restful API(CRUD)
//GET,POST,PATCH,DELETE


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const Pricing = require("./model/Customer.model")
const Equipment = require("./model/equipment.model")

const mongoose = require('mongoose')
const port = process.env.PORT || 8080;
const url =  'mongodb://localhost:27017/pricing';
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, console.log(`DB running on ${url}`));
const con = mongoose.connection;

//Middleware
//This sets this app's view engine to be pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());

//middleware
// let urlencodedParser = (bodyParser.urlencoded({
//     extended:true
// })) //This does so when we use ? * & or all those things, they get encoded properly
// app.use(express.json())
// app.use(cors())


// app.get('/', (req,res) => {
//     res.redirect('/alien')
// })

app.get('/', (req,res) => {
    //I had form with post in the render instead.
    res.render('index',{
        title: 'Articles'
    })
})


//Routers
const alienRouter = require('./router/alien')
app.use('/alien', alienRouter)
const equipmentRouter = require('./router/equipment')
app.use('/equipment', equipmentRouter)


con.on('open',()=>{
    console.log('...connected')
    app.listen(port, function(){
        try{
            console.log(`Running in port: ${port}`)
        }catch(err){
            console.error('The error is:' + err)
        }
    })
})