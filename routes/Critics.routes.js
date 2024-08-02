const express=require('express');
const Criticreview = require('../Criticreview');
const router=express.Router();
const path=require('path');
router.get('/critics',async(req,res)=>{
    const result=await Criticreview.find();
    res.json(result);
})
router.get('/',async(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../UI/home.html'));
})
router.get('/critics/:movieId',async(req,res)=>{
    const movie=req.params.movieId;
    console.log(movie);
    const result=await Criticreview.aggregate([
        {
            $match:{movieId:movie}
         }
        ,{ 
        $group:{
        _id:"$normalisedOriginalScore", totalofthisreview:{$count:{}}
     }}
    ])
    console.log(result);
    res.json(result);
})
router.post('/critics',async(req,res)=>{
   const result= await Criticreview.create(req.body);
    res.json(result);
})
router.put('/critics/:reviewId',async(req,res)=>{
    await  Criticreview.findOneAndUpdate({reviewId:req.params.reviewId},req.body);
})
router.delete('/critics/:reviewId',async(req,res)=>{
    const result=await Criticreview.deleteOne({reviewId:req.params.reviewId}).then(()=>{
        res.send('The critic is deleted');
    })
})
module.exports=router;