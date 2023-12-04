// 
const mongoose= require('mongoose');
// mongoose.Promise= require('bluebird');
// mongoose.connect('mongodb://127.0.0.1:27017/snacktime')
mongoose.connect('mongodb+srv://JivinVarghese:admin@cluster0.s0mgn.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log('success');
    }).catch(()=>{
        console.log('error');
    });
// 
