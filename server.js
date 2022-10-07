const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.static('client'));
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || 8080;

const admin = require('firebase-admin');
const serviceAccount = require('./key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// POST create
app.post('/create', async (req,res)=>{
    try {
        console.log(typeof(req.body.colName));
        console.log(typeof(req.body.data));
        const response = await db.collection(req.body.colName).add(req.body.data);
        res.send(`Document written with id : ${response.id}`);
    } catch(err) {
        res.send(err);
    }
});

// GET read collection
app.get('/read/:collection',async(req,res)=>{
    try {
        const response = await db.collection(req.params.collection).get();
        let ret = []; 
        response.forEach((doc)=>{
            ret.push(doc.data());
        });
        res.send(ret);
    } catch (err) {
        res.send(err);
    }
});

// GET read document
app.get('/read/:collection/:id',async(req,res)=>{
    try {
        const response = await db.collection(req.params.collection).get();
        let ret = []; 
        response.forEach((doc)=>{
            doc.id === req.params.id && ret.push(doc.data());
        });
        res.send(ret);
    } catch (err) {
        res.send(err)
    }
});

app.listen(PORT,()=>{console.log(`Up and running at http://localhost:${PORT}`)});