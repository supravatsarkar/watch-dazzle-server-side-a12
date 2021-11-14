const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
        const reviewCollection = database.collection('reviews');
        const orderCollection = database.collection('orders');

        // (API) GET ALL PRODUCT
        app.get('/products', async (req, res) => {
            const query = {};
            const result = await productCollection.find({}).toArray();
            // console.log(result);
            res.json(result);
        })

        //(API) GET SINGLE PRODUCT
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.findOne(query);
            // console.log('product details-', result);
            res.json(result);
        })

        //(API) GET REVIEWS
        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.json(result);
        })

        // book order api 
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            console.log(result);
            res.json(result);
        })

        // order filter by email 
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const filter = { email: email };
            const result = await orderCollection.find(filter).toArray();
            res.json(result);
        })

        // delete order api
        app.delete('/orders', async (req, res) => {
            const id = req.query.id;
            const query = { _id: ObjectId(id) }
            const result = await orderCollection.deleteOne(query);
            console.log(result);
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