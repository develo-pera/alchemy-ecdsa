## ECDSA Node

## Steps

1. Open a terminal within the `/server` folder and run `node generate` 3 times
2. Go to `index.js` and paste generated addresses in balances object on line 13
3. Do `Client` and `Server` steps
4. In `/server` terminal window run `node sign <privateKeyOfSender> <amount> <recepient>` and pass `r`, `s`, and `recovery` values to input filed on Client app
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
