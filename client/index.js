import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io();
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

function reducer(state = {}, action){
  switch(action.type) {
    case 'newRead':
      return Object.assign({}, { newRead: action.data });
    default:
      return state;
  }
}

let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log('new client state', JSON.stringify(store.getState()));
});

setTimeout(() => {
  console.log('sending action');
  store.dispatch({ type: 'server/command', data: { object: 'pump', value: 'on' } });
}, 2000);
