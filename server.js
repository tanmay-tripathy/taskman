const express = require('express')
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.static('client'));

// app.get('/get',(req,res)=>{

// })

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("./taskman-6def0-firebase-adminsdk-d2d3a-4d5f938e9e.json")
});

console.log('Firebase App connected ... ');

const db = admin.firestore();

console.log("Firestore Connected ... ");

async function add() {
    return ret = await db.collection('users').add({
        "name": "rohit dhakad",
        "sex": "male",
        "age": 69
    });
}

app.post('/create',(req,res,next)=>{
    // console.log(req.body);
    // const ret = db.collection('users').add({
    //     "name": "rohit dhakad",
    //     "sex": "male",
    //     "age": 69
    // })
    // .then(response => {
    //     console.log('in the data ');
    //     return {id : response.id};
    // })
    // .catch(err => {
    //     console.log(err);
    //     return {error : err};
    // });
    // console.log(ret);
    // res.json(ret);
    // console.log(db);
    const ret = add();
    console.log(ret);
    ret.then(doc=>console.log(doc)).catch(err=>console.log(err));
    res.status(200).json({});
})

PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log(`Up and running at http://localhost:${PORT}`)});