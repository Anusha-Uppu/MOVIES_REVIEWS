const Users=require('./User');
const fs=require('fs');
const csv=require('csv-parser');
const connection=require('./Connection');
const csvParser = require('csv-parser');
const { pipeline } = require('stream');
let c=0;
let r=0;
const users=[];
async function fun(){
    await connection();
    const stream=fs.createReadStream('/Users/admin/Documents/CODE/Movies_Reviews/archive/user_reviews.csv/user_reviews.csv');
    const csvStream=csv();
    const csvPipe=stream.pipe(csvStream)
    csvPipe.on('data', async function(row){
        csvPipe.pause();
        try{
            await Users.create({
                        movieId:row.movieId,
                        rating:parseInt(row.rating),
                        reviewId:row.reviewId,
                        isVerified:Boolean(row.isVerified),
                        isSuperReviewer:Boolean(row.isSuperReviewer),
                        hasSpoilers:Boolean(row.hasSpoilers),
                        hasProfanity:Boolean(row.hasProfanity),
                        score:parseInt(row.score),
                        creationDate:new Date(row.creationDate),
                        userDisplayName:row.userDisplayName,
                        userRealm:row.userRealm,
                        userId:row.userId
                    })
        }catch(err){
            console.log('Error:'+err);
        }
        finally{
            csvPipe.resume();
        }
    }).on('end',()=>{
        console.log('data inserted successfully');
    }).on('error',()=>{
        console.log('Error');
    })

}
fun();