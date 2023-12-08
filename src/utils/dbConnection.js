const { MongoClient } = require("mongodb");

let dbConnection;

const mongoConnection = async () => {
  const uri = process.env.URI
    ? process.env.URI
    : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m4rht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  console.log("MongoDB connection URI:", uri);
  const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await mongoClient.connect();
    console.log("db connected successfully");
    const database = mongoClient.db("DazzleWatch");
    dbConnection = database;
  } catch (error) {
    // console.log("connection error", error);
    throw error;
  }
};

const getDb = () => dbConnection;

module.exports = { mongoConnection, getDb };
