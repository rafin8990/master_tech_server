const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://master-tech:K4QhoBCbnA75AHu0@cluster0.5xecsyp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log(" successfully connected to MongoDB!");
    const productCollection = client
      .db("master-tech")
      .collection("AllProducts");
    const categoryCollection = client
      .db("master-tech")
      .collection("categories");

    // ------------PRODUCT------------------------------

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });
    app.get("/products", async (req, res) => {
      const result = await productCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/categories", async (req, res) => {
      const name = req.query.categoryName;
      const query = { categoryName: name };
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/category", async (req, res) => {
      const query = {};
      const result = await categoryCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.log);

app.get("/", (req, res) => {
  res.send("Computer builder server is running");
});

app.listen(port, () => {
  console.log(`Computer builder server running on ${port}`);
});
