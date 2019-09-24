const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

  module.exports = (async function() {
  // Connection URL
  const url = 'mongodb://127.0.0.1:27017/';
  // Database Name
  const dbName = 'node-app';
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection('dates');
    let r = await col.insertMany([{ date: new Date() }]);

    const docs = await col.find().toArray();
    console.log(docs);
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();
