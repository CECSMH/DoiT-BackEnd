const express = require('express'); //importing express module.
const server = express();
const cors = require('cors');
server.use(cors());
server.use(express.json()); // set module to use json notation.

require('dotenv-safe').load();
const port = process.env.PORT || 3001;

const Routes = require('./routes/routes'); // importing routes.

server.use('/task', Routes);


server.listen(port, ()=>{
    console.log('ONLINE!');
    console.log('Online rodando em '+ port);
})