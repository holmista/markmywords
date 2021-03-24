const { json } = require('express')
const express = require('express')
const cors = require('cors');
server = express()
const MongoClient = require("mongodb").MongoClient;
const dbConnectionUrl = "mongodb+srv://tornike:Sai123&@rai@cluster0.ro4dz.mongodb.net/data?retryWrites=true&w=majority";

server.use(express.json())
server.use(cors());

server.post('/signup',  (req, res)=>{
    const email = req.body.useremail
    const password = req.body.userpassword
    signup(email, password)
    .then(value=>value?res.send('you are registered'):res.send('such account already exists'))
})

server.post('/login', (req, res)=>{
    const name = req.body.name
    const password = req.body.password
    check(name, password)
    
})

async function login(name, password){
    const client = new MongoClient(dbConnectionUrl)
    try{
        await client.connect();
        const database = client.db("data");
        const movies = database.collection("movies");
        const query = { name: "toke" };
        const movie = await movies.findOne(query);
        if(movie.name===name && movie.password===password){
            return true
        }
        else{
            return false
        }
        
    }catch(err){
        console.log(err)
    }
}

async function signup(theemail, password){
    const client = new MongoClient(dbConnectionUrl)
    try{
        await client.connect();
        const db = client.db("data");
        const movies = db.collection("movies");
        const query = {email:theemail};
        const email = await movies.findOne(query);
        if (email){
            return false
        }else{
            movies.insertOne({email:theemail,password:password})
            return true
        }
        
    }catch(err){
        console.log(err)
    }
    
}

server.listen(5000)