import express from 'express';
import { Server } from 'http';
import path from 'path';

const app = express();
export const http = Server(app); // eslint-disable-line new-cap

app.use('/', express.static(__dirname + '/..'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});
