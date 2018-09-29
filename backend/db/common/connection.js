const config=require('./config');
const mongoose=require('mongoose');
mongoose.connect(config.dbUrl,()=>{

    console.log('successfully connected to the db...');
});

module.exports=mongoose;