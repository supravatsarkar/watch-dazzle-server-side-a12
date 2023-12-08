// external modules
const express = require("express");
const app = express();
const cors = require("cors");

// internal modules
const reviewRoutes = require("./routes/review.routes");
const orderRoutes = require("./routes/order.routes");

// middleware
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());

// routes
app.use("/reviews", reviewRoutes);
app.use("/orders", orderRoutes);

/*
async function run() {
  try {
    await mongoClient.connect();
    console.log("db connected successfully");
    const database = mongoClient.db("DazzleWatch");
    const productCollection = database.collection("products");
    const reviewCollection = database.collection("reviews");
    const orderCollection = database.collection("orders");
    const userCollection = database.collection("users");

    app.use("/api/v1/products", productV1Router);

    //(API) GET REVIEWS
    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });

    //add review api
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      console.log(review);
      const result = await reviewCollection.insertOne(review);
      console.log(result);
      res.json(result);
    });

    // book order api
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      console.log(result);
      res.json(result);
    });

    // order filter by email
    app.get("/orders", async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const result = await orderCollection.find(filter).toArray();
      res.json(result);
    });

    // delete order api
    app.delete("/orders", async (req, res) => {
      const id = req.query.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      // console.log(result);
      res.json(result);
    });

    // save user api
    app.put("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const filter = { email: user.email };
      const options = { upsert: true };
      const result = await userCollection.insertOne(user, filter, options);
    });

    // make admin api
    app.put("/users/makeAdmin/:email", async (req, res) => {
      const email = req.params.email;
      console.log("make admin-", email);
      const filter = { email: email };
      const updateDoc = { $set: { role: "admin" } };
      const result = await userCollection.updateOne(filter, updateDoc);
      console.log(result);
      res.json(result);
    });

    // check admin api
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      if (result?.role === "admin") {
        // result.role = true;
        res.json({ admin: true });
      } else {
        res.json({ admin: false });
      }
      console.log(result);
    });

    // get all order api
    app.get("/allOrders", async (req, res) => {
      const result = await orderCollection.find({}).toArray();
      console.log("hit all orders");
      console.log(result);
      res.json(result);
    });

    app.put("/allOrders/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const updateDoc = { $set: { status: "Shipped" } };
      const result = await orderCollection.updateOne(filter, updateDoc);
      console.log("status", result);
      res.json(result);
    });
  } finally {
    // client.close();
  }
}
run().catch(console.dir);
*/

app.get("/", (req, res) => {
  res.send("Running Watch Dazzle Server.....");
});

app.use("*", (req, res, next) => {
  console.log("page not exist handler");
  res.status(404).send({ status: false, error: "Page not exist!" });
});
app.use((error, req, res, next) => {
  console.log("error handler=>", error);
  res.status(500).send({ status: false, error: error });
});

module.exports = app;
