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

const getDocuments = () => {
  return dbInstance ? [] : dbInstance.collection('documents');
};

const insertDocuments = (data) => {
  return new Promise((resolve, reject) => {
    const documents = getDocuments();

    if (documents === null) {
      reject('no documents');
    }

    documents.insertMany(data, (err, result) => {
      if (err === null) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const findDocuments = (data) => {
  return new Promise((resolve, reject) => {
    const documents = getDocuments();

    if (documents === null) {
      reject('no documents');
    }

    documents.find(data).toArray((err, result) => {
      if (err === null) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

export default { getDocuments, insertDocuments, findDocuments };
