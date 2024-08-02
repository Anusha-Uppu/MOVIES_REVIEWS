const express=require('express');
const router=express.Router();
const app=express();
const Users=require('../User');
const body=require('body-parser');
const Movies = require('../Movies');
router.get('/users',async(req,res)=>{
    const users=await Users.find();
    res.json(users);
})
router.get('/users/frequency/:movieTitle',async(req,res)=>{
    try{
        const movieId=await Movies.findOne({movieTitle:req.params.movieTitle});
        const result=await Users.aggregate([
            {$match:{movieId:Object(movieId._id)}},
            {$group:{
                _id:"$rating",
                totalPeople_giventhis_rating:{$count:{}}
            }}
        ])
        res.json(result);
    }catch(err){
        res.send('---ERROR:'+err+'----');
    }
})
router.get('/users/:userId',async(req,res)=>{
    const user=await Users.findOne({userId:req.params.userId});
    if(user){
        res.json(user);
    }
    else{
        res.send('User not found');
    }
   

})
router.post('/users',async(req,res)=>{
    try{
        await Users.create(req.body);
        res.send('User created');
    }
   catch(err){
    res.send('User is not created');
   }

})
router.put('/users/:userId',async(req,res)=>{
    await Users.findOneAndUpdate({userId:req.params.userId},req.body);
    res.send('Updated');
})

router.delete('/users/:userId',async(req,res)=>{
    try{
    await Users.deleteOne({userId:req.params.userId});
    res.send('User deleted');
    }catch(err){
        res.send('User is not deleted cause of error'+err);
    }

})
module.exports=router;