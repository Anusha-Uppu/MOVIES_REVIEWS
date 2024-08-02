const fs=require('fs');
const csv=require('csv-parser');
const Movies = require('./Movies');
const connection=require('./Connection')
class check{
    check(moviesId,movieTitle,movieYear,movieUrl,movieRank,critic_score,audience_score){
        this.moviesId=moviesId,
        this.movieYear=movieYear,
        this.movieTitle=movieTitle,
        this.movieUrl=movieUrl,
        this.movieRank=movieRank,
        this.critic_score=critic_score,
        this.audience_score=audience_score
    }
}
// async function data_checking(data){
//     await Movies.create(data);
// }
const list=[];
async function fun(){
    await connection();
    fs.createReadStream('./archive/movies.csv/movies.csv',{
        encoding:'utf-8'
    }).pipe(csv())
    .on('data',async function(row){
        await Movies.create({
            moviesId:row.movieId,
            movieTitle:row.movieTitle,
            movieYear:parseInt(row.movieYear),
            movieUrl:row.movieURL,
            movieRank:parseInt(row.movieRank),
            critic_score:row.critic_score,
            audience_score:row.audience_score
        });
    }).on('end', ()=>{
        console.log('Data read successsfully');
    }).on('error',()=>{
        console.log('Error occured');
    })
}
fun();