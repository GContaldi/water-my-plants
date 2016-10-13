import { http } from './express';
import './socketIO';

http.listen(3000, function() {
  console.log('listening on http://localhost:3000');
});
