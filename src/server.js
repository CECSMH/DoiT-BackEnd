require('dotenv-safe').load();

const index = require('./index');
const port = process.env.PORT || 3001;

index.listen(port, ()=>{
    console.log('Online rodando em '+ port);
})