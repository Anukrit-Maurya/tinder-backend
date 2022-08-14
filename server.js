import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cards from "./dbCards.js"
//App config
const app=express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://anukrit:281122@cluster0.wgvgrf3.mongodb.net/?retryWrites=true&w=majority'


//Middleware
app.use(express.json());
app.use(cors());
//Dbconfig
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
})

//API endpoints

app.get('/',(req,res)=> res.status(200).send('hello tinder user'));

app.post('/tinder/cards',(req,res)=>{
    const dbCard = req.body;
    cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/cards',(req,res)=>{
    cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
});

//Listener

app.listen(port,()=>console.log(`listening onlocalhost:${port}`));