const express= require('express');
const path=require('path');
const staticRoute= require('./routes/staticRoute');
const cookieParser=require('cookie-parser');

const app = express();
const PORT = 8080;

const getShortURL= require('./routes/url');
const URL=require('./models/url')
const userRoute= require('./routes/user');
const {checkForAuthentication, restrictTo} = require('./middlewares/auth');


const connectToMongoDB= require('./connection');

//connect to mongodb
connectToMongoDB('mongodb://localhost:27017/URLShortner')
.then(()=>{console.log("connected to mongodb")});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))//jitne bhi views files hai na vo ./views folder me hai.


app.use(express.urlencoded({extended: false}));//form data support krenge
app.use(express.json());//json data support krenge
app.use(cookieParser());
app.use(checkForAuthentication);


app.use('/user',userRoute);
app.use('/getShortURL',restrictTo(['NORMAL']) ,getShortURL);// if logged in then getShortURL will work, this is called inline middleware.
app.use('/', staticRoute);
//app.use('/user',userRoute);

app.get('/getShortURL/:shortId',async (req, res)=>{
    const shortId= req.params.shortId;
    console.log(shortId)
    const entry= await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push:{
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    });
    //console.log(entry);
    res.redirect(entry.redirectURL);
});

app.listen(PORT,(err)=>{console.log(`Server started at port : ${PORT}`)})

