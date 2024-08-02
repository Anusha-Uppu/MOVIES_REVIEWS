const fs=require('fs');
const csv=require('csv-parser');
const connection=require('./Connection');
const Criticreview = require('./Criticreview');
const Movies = require('./Movies');

const list=[];
function finding_dinominator(val){
    let i=0;
    for(let c of val){
        i++;
        console.log(c);
        if(c=='/'){
            const val2=val.slice(i);
            console.log(val2);
            return val2;
        }
    }
}
function converting(data){
    const dinaminator=finding_dinominator(data);
    const val=parseFloat(data);
    const res=(val/dinaminator)*5;
    console.log(res);
    return res;
}
async function inserting(row){
    let original=0;
    if(row.originalScore){
        if(row.originalScore=='A+'){
            original=5;
        }
        else if(row.originalScore=='A'){
            original=4;
        }
        else if(row.originalScore=='B+'){
            original=3;
        }
        else if(row.originalScore=='B'){
            original=2
        }
        else if(row.originalScore=='C+'){
            original=1;
        }
        else if(parseInt(row.originalScore)<=10 && parseInt(row.originalScore)>=0){
            original=converting(row.originalScore);
            
        }
        else{
            original=0;
        }
    }
    else{
        original=parseInt(0);
    }
    if(isNaN(original)){
        original=0;
    }
    const moviesId=await Movies.findOne({moviesId:row.movieId});
    let id;
    if(moviesId!=null){
         id=moviesId.id;
        console.log(moviesId);
    }
   else{
    id=null;
   }
    console.log(original,'original');
    const val={
        reviewId:row.reviewId,
        creationDate:new Date(row.creationDate),
        criticName:row.criticName,
        criticPageUrl:row.criticPageUrl,
        reviewState:row.reviewState,
        isFresh:Boolean(row.isFresh),
        isRotten:Boolean(row.isRotten),
        isTopicCritic:Boolean(row.isTopicCritic),
        publicationUrl:row.publicationUrl,
        publicationName:row.publicationName,
        reviewUrl:row.reviewUrl,
        quote:row.quote,
        scoreSentiment:row.scoreSentiment,
        originalScore:row.originalScore,
        movieId:id,
        normalisedOriginalScore:parseInt(original),
        
    }
    await Criticreview.create(val);
}
async function fun(){
    await connection();
    fs.createReadStream('./archive/critic_reviews.csv/critic_reviews.csv',{
        encoding:'utf-8'
    }).pipe(csv())
    .on('data', async function(row){
      await  inserting(row);
    // list.push(row);

    }).on('end',()=>{
     
        // console.log(list[2]);
        // const vall=list[2].originalScore;
       
        // console.log(res);
        console.log('data reading completed');
    })
    .on('error',()=>{
        console.log('error occured');
    })
}
fun();