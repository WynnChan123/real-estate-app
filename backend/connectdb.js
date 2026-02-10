require("dotenv").config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;


let client;

async function connectDB() {
  try {
    if(!client){
      // Create a MongoClient with a MongoClientOptions object to set the Stable API version
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1, 
          strict: true,
          deprecationErrors: true,
        }
      });
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    return client;
  }catch (e) {
    console.error("Error connecting to MongoDB:", e);
    throw e;
  }
}
module.exports = { connectDB };
