const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const validator = require('validator');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fus4ier.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    const database = client.db("urlManagementDB");
    const longUrlCollection = database.collection("urlCollection");

    app.post('/shortenUrl', async (req, res) => {
      const { originalUrl } = req.body;
      const isValidUrl = validator.isURL(originalUrl, {
        protocols: ['http', 'https'],
        require_protocol: true,
        require_tld: true,
        require_host: true,
        allow_underscores: false,
        disallow_auth: true,
        validate_length: true,
      });
      
      if (!isValidUrl) {
        return res.status(400).json({ error: 'Invalid URL' });
      }

      const shortUrl = shortid.generate();
      const urlData = { originalUrl, shortUrl };
      const result = await longUrlCollection.insertOne(urlData);
      res.json({ shortUrl });
    });

    // Endpoint to redirect to the original URL
    app.get('/:shortUrl', async (req, res) => {
      const { shortUrl } = req.params;
      const urlData = await longUrlCollection.findOne({ shortUrl });
      if (urlData) {
        res.redirect(urlData.originalUrl);
      } else {
        res.status(404).send('URL not found');
      }
    });

    // Ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=> {
  res.send('url shortener running')
})

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`)
});
