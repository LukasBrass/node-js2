const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

module.exports.addDates = async function(dateList) {
  return new Promise((resolve, reject) => {
    // Connection URL
    const url = "mongodb://127.0.0.1:27017/";
    // Database Name
    const dbName = "node-app";
    const client = new MongoClient(url);
    try {
      // Use connect method to connect to the Server
      client.connect().then(() => {
        const db = client.db(dbName);
        const col = db.collection("dates");
        col
          .insertMany(dateList)
          .then(result => resolve(true))
          .catch(error => reject(error));
      });
    } catch {
      client.close();
      reject(false);
    }
  });
};

module.exports.listDates = async function() {
  return new Promise((resolve, reject) => {
    // Connection URL
    const url = "mongodb://127.0.0.1:27017/";
    // Database Name
    const dbName = "node-app";
    const client = new MongoClient(url);

    try {
      // Use connect method to connect to the Server
      client.connect().then(() => {
        const db = client.db(dbName);
        const col = db.collection("dates");
        col
          .find()
          .toArray()
          .then(result => {
            resolve(result);
          })
          .catch(error => reject(error));
      });
    } catch (err) {
      client.close();
      reject(false);
    }
  });
};
