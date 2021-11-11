const express = require('express');
const app = express();
const port = process.env.PORT = 5000;
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m4rht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('db connected successfully');
        const database = client.db('DazzleWatch');
        const productCollection = database.collection('products');

        app.get('/products', async (req, res) => {
            const query = {};
            const result = await productCollection.find({}).toArray();
            // console.log(result);
            res.json(result);
        })
    }
    finally {
        // client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Watch Dazzle Server.....');
})

app.listen(port, () => {
    console.log('Listening port:', port);
})