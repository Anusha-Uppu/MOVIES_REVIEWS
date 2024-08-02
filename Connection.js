const mongoose=require('mongoose');

async function connection(){
    await mongoose.connect('mongodb://localhost/review11');
    console.log('Connected with database');
}
module.exports=connection