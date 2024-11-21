var express = require("express");
let app = express();
// const cors = require("cors");
// app.use(cors());
app.use(express.json());
app.set('json spaces', 3);
const path = require('path');
let PropertiesReader = require("properties-reader");
// Load properties from the file
let propertiesPath = path.resolve(__dirname, "dbconnections.properties");
let properties = PropertiesReader(propertiesPath);

// Extract values from the properties file
const dbPrefix = properties.get('db.prefix');
const dbHost = properties.get('db.host');
const dbName = properties.get('db.name');
const dbUser = properties.get('db.user');
const dbPassword = properties.get('db.password');
const dbParams = properties.get('db.params');

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// MongoDB connection URL
const uri = `${dbPrefix}${dbUser}:${dbPassword}${dbHost}${dbParams}`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

let db1;//declare variable

app.use(express.static('public'))

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

async function connectDB() {
    try {
        client.connect();
        console.log('Connected to MongoDB');
        db1 = client.db(dbName);
        // console.log(db1)
    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.error(err.message)
    }
}

connectDB(); //call the connectDB function to connect to MongoDB database

//Optional if you want the get the collection name from the Fetch API in test3.html then
// app.param('collectionName', async function (req, res, next, collectionName) {
//     req.collection = db1.collection(collectionName);
//     /*Check the collection name for debugging if error */
//     console.log('Middleware set collection:', req.collection.collectionName);
//     next();
// });

// Ensure this route is defined after the middleware app.param
// get all data from our collection in Mongodb
app.get('/collections/:collectionName', async function (req, res, next) {
    console.log("executing");
    
    try{
        connectDB()
        console.log("executing1");
        // const database = client.db("coursework")
        const collection = db1.collection(req.params.collectionName)
        const results = await collection.find({}).toArray();
        // const results = await 

        console.log('Retrive data:', results);
        // console.log(client.db("coursework"))

        // client.connect()

        res.json(results);
        // res.send(client.db().databaseName)
        // res.send(db1.db().databaseName);
        // console.log(client.db().databaseName)

    }
    catch(err){
        console.error('Error fetching docs', err.message);
        next(err);
    }

});

app.get('/collections1/:collectionName', async function (req, res, next) {

});

app.get('/collections/:collectionName/:max/:sortAspect/:sortAscDesc', async function (req, res, next) {

});

app.get('/collections/:collectionName/:id', async function (req, res, next) {

});

app.post('/collections/:collectionName', async function (req, res, next) {
    try{
        connectDB()
        // const database = client.db("coursework")
        const collection = db1.collection(req.params.collectionName)
        const results = await collection.insertOne(req.body);
        // const results = await 

        console.log('Recieved request: ', req.body);
         console.log(client.db("coursework"))

        // client.connect()

        res.json(results);
        // res.send(client.db().databaseName)
        // res.send(db1.db().databaseName);
        // console.log(client.db().databaseName)

    }
    catch(err){
        console.error('Error fetching docs', err.message);
        next(err);
    }

});

app.delete('/collections/:collectionName/:id', async function (req, res, next) {
    
    try{
        connectDB()
        // const database = client.db("coursework")
        const collection = db1.collection(req.params.collectionName)
        const results = await req.collection.deleteOne({_id: new ObjectId(req.params.id)});
        // const results = await 

        console.log('Deleted data: ', results);
        // console.log(client.db("coursework"))

        // client.connect()

        res.json(results.deletedCount ===1)? {msg: "success"} :{msg:"error"};
        // res.send(client.db().databaseName)
        // res.send(db1.db().databaseName);
        // console.log(client.db().databaseName)

    }
    catch(err){
        console.error('Error fetching docs', err.message);
        next(err);
    }

});

app.put('/collections/:collectionName/:id', async function (req, res, next) {
    try{
        connectDB()
        // const database = client.db("coursework")
        const collection = db1.collection(req.params.collectionName)
        const results = await req.collection.updateOne({_id: new ObjectId(req.params.id)},
    {$set:req.body});
        // const results = await 

        console.log('Deleted data: ', results);
        // console.log(client.db("coursework"))

        // client.connect()

        res.json(results.matchedCount === 1)? {msg: "success"} :{msg:"error"};
        // res.send(client.db().databaseName)
        // res.send(db1.db().databaseName);
        // console.log(client.db().databaseName)

    }
    catch(err){
        console.error('Error fetching docs', err.message);
        next(err);
    }

});

app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ error: 'An error occurred' });
});

