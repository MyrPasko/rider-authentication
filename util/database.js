const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');

let _db;

const mongoConnect = (callback) => {
  mongoose.connect('mongodb+srv://MyrPasko:GV5g9KlXTPZdgavJ@cluster0-4pxpw.mongodb.net/test?retryWrites=true&w=majority')
    .then((result) => {
      console.log('[Connected to MONGO with Mongoose]');
      callback();
    })
    .catch((err) => {
      console.log("Error from MongoClient: ", err);
      throw err;
    });

};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// GV5g9KlXTPZdgavJ
