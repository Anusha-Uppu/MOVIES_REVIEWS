
const express=require('express')
const Movies = require('../Movies');
const router=express.Router();
const app=express();
// const body=require('body-parser');
router.get('/movies',async function getMovies(req,res){
    const movies=await Movies.find();
     
    res.json(movies);
})
router.post('/movies',async(req,res)=>{
    const val={
        movieId:req.body.movieId,
        movieTitle:req.body.movieTitle,
        movieYear:req.body.movieYear,
        movieUrl:req.body.movieUrl,
        movieRank:req.body.movieRank,
        critic_score:req.body.critic_score,
        audience_score:req.body.audience_score
    }
    const movie=await Movies.create(val);
    res.json(movie);
})
router.put('/movies/:movieId',async(req,res)=>{
   await  Movies.findOneAndUpdate({moviesId:req.params.movieId},req.body);
    // const movie=Movies.findOne({moviesId:req.params.movieId});
    // const up=movie.updateOne(req.body);
    res.send('Updated');
})
router.delete('/movies/:movieId',async(req,res)=>{
    await Movies.deleteOne({moviesId:req.params.movieId}).then(()=>{
        res.send('Deletted');
    })

})

module.exports=router;