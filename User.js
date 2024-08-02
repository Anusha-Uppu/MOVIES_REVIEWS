const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    movieId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Movies"
    },
    rating:Number,
    reviewId:String,
    isVerified:Boolean,
    isSuperReviewer:Boolean,
    hasSpoilers:Boolean,
    hasProfanity:Boolean,
    score:Number,
    creationDate:Date,
    userDisplayName:String,
    userRealm:String,
    userId:String
})
module.exports=mongoose.model("Users",UserSchema);