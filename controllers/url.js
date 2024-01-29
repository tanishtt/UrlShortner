const shortid =require('shortid');
//generate a nanoid

const URL = require('../models/url')


async function handleGenerateNewShortURL(req, res){
    
    const body= req.body;
    console.log(req.user);
    if(!body.url){console.log(body.url);return res.status(400).json({error : "url is required!!!."})};

    const shortID= shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy: req.user._id, 
    });

    const getAllUrls=await URL.find({});

    return res.render('home',{
        //urls: getAllUrls
    });
}

async function handleGetAnalytics(req, res){
    const shortId= req.params.shortId;
    const result= await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics:result.visitHistory,
    })
}


module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
    
};