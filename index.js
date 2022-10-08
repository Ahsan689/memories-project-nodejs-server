import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'

const app = express();

// with .env file Our CREDENTIALS cannot be accessed by anyOne on gitHub.
// As .env file is only accessible on our local machine
dotenv.config()



app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

app.use('/posts',postRoutes)

// const CONNECTION_URL = 'mongodb+srv://ahsan:ahsan12345@cluster0.lrptc.mongodb.net/?retryWrites=true&w=majority'

//  https://cloud.mongodb.com/atlas

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
          console.log("database is CONNECTED!!");
         app.listen(PORT,() => console.log(`Server running on port: ${PORT}`) )
    })
    .catch(e => console.log("errr>>", e))

// mongoose.set('useFindandModify', false);
