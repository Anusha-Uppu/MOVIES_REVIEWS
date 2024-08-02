const mongoose=require('mongoose');

const criticReviewSchema=new mongoose.Schema({
    reviewId:Number,
    creationDate:Date,
    criticName:String,
    criticPageUrl:String,
    reviewState:String,
    isFresh:Boolean,
    isRotten:Boolean,
    isTopicCritic:Boolean,
    publicationUrl:String,
    publicationName:String,
    reviewUrl:String,
    quote:String,
    scoreSentiment:String,
    originalScore:String,
    movieId:{
       type: mongoose.SchemaTypes.ObjectId,
       ref:"Movies"
    },
    normalisedOriginalScore:{
        type:Number,
    }  
})
module.exports=mongoose.model('critics',criticReviewSchema);