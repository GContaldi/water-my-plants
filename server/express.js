import express from 'express';
import { Server } from 'http';
import path from 'path';
// import mongoClient from './mongoClient';

const app = express();
export const http = Server(app); // eslint-disable-line new-cap

app.use('/', express.static(__dirname + '/..'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/groups/:group_id/history', function(req, res) {
  res.send({ some: 'JSON' });
  // TODO: query from db
  // mongoClient.findDocuments({}).then(
  //   (result) => {
  //     res.send(result);
  //     console.log('MongoDB - Action saved in DB', result);
  //   },
  //   (reason) => console.log('MongoDB - query crashed', reason);
  // );
});
