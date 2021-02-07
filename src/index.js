const express = require('express'); //importing express module.
const server = express();
const cors = require('cors');
server.use(cors());
server.use(express.json()); // set module to use json notation.

const Routes = require('./routes/routes'); // importing routes.

server.use('/task', Routes);


server.listen(8080, ()=>{
    console.log('ONLINE!');
})