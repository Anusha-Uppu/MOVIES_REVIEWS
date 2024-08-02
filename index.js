const connection=require('./Connection');
const express=require('express');
const bodyParser=require('body-parser');
const movieRoutes=require('./routes/Movies.routes');
const criticsRoutes=require('./routes/Critics.routes');
const userRoutes=require('./routes/Users.routes');
// const home=require('./UI/hone.html');
const app=express();
async function main(){
    await connection();
    // app.use('/',home);
    app.use('/api',movieRoutes);
    app.use('/api',criticsRoutes);
    app.use('/api',userRoutes);
    app.listen(3000,()=>{
        console.log('----Server is running on the port 3000-----');
    })
    console.log('----Application started------');
}
main();