import { MongoClient } from 'mongodb';
import assert from 'assert';
import { Promise } from 'es6-promise-polyfill';

// Connection URL
const url = 'mongodb://localhost:27017/my-water-plants';
let dbInstance = null;

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {  // eslint-disable-line new-cap
  assert.equal(null, err);
  console.log('Connected correctly to MongoDB');

  dbInstance = db;
});

const getCollection = (collectionName) => {
  return new Promise((resolve, reject) => {
    if (dbInstance === null) {
      reject('no Mongo client instance');
    }

    const collection = dbInstance.collection(collectionName);
    resolve(collection);
  });
};

const insertDocuments = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    const insert = (collection) => {
      collection.insertMany(data, (err, result) => {
        if (err === null) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    };

    getCollection(collectionName).then(insert, reject);
  });
};

const insertDocument = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    const insert = (collection) => {
      collection.insert(data, (err, result) => {
        if (err === null) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    };

    getCollection(collectionName).then(insert, reject);
  });
};

const findDocuments = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    const find = (collection) => {
      collection.find(data).toArray((err, result) => {
        if (err === null) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    };

    getCollection(collectionName).then(find, reject);
  });
};

export default { getCollection, insertDocument, insertDocuments, findDocuments };
