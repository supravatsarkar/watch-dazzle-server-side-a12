const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const { query } = require('express');
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
        const userCollection = database.collection('users');


        // post product api 
        app.post('/products', async (req, res) => {
            const product = req.body
            // console.log(product);
            const result = await productCollection.insertOne(product);
            res.json(result);
        })

        //put product api
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const product = req.body;
            const filter = { _id: ObjectId(id) };
            console.log(id, product);
            const updateDoc = {
                $set: product
            };
            const result = await productCollection.updateOne(filter, updateDoc);

            res.json(result);
        })

        // (API) GET ALL PRODUCT
        app.get('/products', async (req, res) => {
            const query = {};
            const result = await productCollection.find({}).toArray();
            // console.log(result);
            res.json(result);
        })

        // delete product api
        app.delete('/products', async (req, res) => {
            const id = req.query.id;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(query);
            // console.log(result);
            res.json(result);
        })


        //(API) GET SINGLE PRODUCT
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            console.log('product details-', id);
            const query = { _id: ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.json(result);
        })



        //(API) GET REVIEWS
        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.json(result);
        })

        //add review api
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            console.log(review)
            const result = await reviewCollection.insertOne(review);
            console.log(result);
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
            // console.log(result);
            res.json(result);
        })

        // save user api
        app.put('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const filter = { email: user.email };
            const options = { upsert: true };
            const result = await userCollection.insertOne(user, filter, options);
        })

        // make admin api
        app.put('/users/makeAdmin/:email', async (req, res) => {
            const email = req.params.email;
            console.log('make admin-', email);
            const filter = { email: email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await userCollection.updateOne(filter, updateDoc);
            console.log(result);
            res.json(result);
        })

        // check admin api 
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.findOne(query);
            if (result?.role === 'admin') {
                // result.role = true;
                res.json({ admin: true });
            } else {
                res.json({ admin: false });
            }
            console.log(result);

        })

        // get all order api 
        app.get('/allOrders', async (req, res) => {
            const result = await orderCollection.find({}).toArray();
            console.log('hit all orders');
            console.log(result);
            res.json(result);
        })

        app.put('/allOrders/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateDoc = { $set: { status: 'Shipped' } }
            const result = await orderCollection.updateOne(filter, updateDoc);
            console.log('status', result);
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