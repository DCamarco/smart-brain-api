const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
        client: 'postgresql',
        connection: {
          host : 'postgresql://postgres:1Xvgs9bCn3UP5jRC1KXL@containers-us-west-110.railway.app:7766/railway', //localhost
          user : 'postgres', //add your user name for the database here
          port: 7766, // add your port number here
          password : '1Xvgs9bCn3UP5jRC1KXL', //add your correct password in here
          database : 'railway' //add your database name you created here
        }
});


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res)=> { res.send('Server Active!') })

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})