const mongoose=require('mongoose');

const MovieSchema=new mongoose.Schema({
    moviesId:{
        type:String
    },
    movieTitle:{
        type:String,
    },
    movieYear:{
        type:Number,
    },
    movieUrl:{
        type:String,
    },
    movieRank:{
        type:Number,
    },
    critic_score:{
        type:String,
    },
    audience_score:{
        type:String
    },
    
},{timestamps:true})
module.exports=mongoose.model('Movies',MovieSchema);