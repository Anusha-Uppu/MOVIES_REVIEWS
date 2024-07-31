const mongoose=require('mongoose');

async function connection(){
    await mongoose.connect('mongodb://localhost/review');
    console.log('Connected with database');
}
module.exports=connection