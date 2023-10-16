// config inicial
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
require('dotenv').config();




// Enable CORS for all routes
app.use(cors());

// Your API routes and other server setup here...

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});


// forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended:true,
    }),
)

app.use(express.json())

//rotas Api
const musicaRotas = require('./routes/musicasRotas')

app.use('/Musica', musicaRotas)

const showAntigoRotas = require('./routes/showAntigoRotas')

app.use('/showAntigo', showAntigoRotas)

const showRotas = require('./routes/showRotas')

app.use('/show', showRotas)




    
// rota inicial / endpoint 
app.get('/', (req,res)=>{
    
    //mostrar req
    res.json({message: 'oi express'})

})

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


// entregar uma porta 
mongoose.connect(
    `mongodb+srv://${username}:${password}@apicluster.agekuww.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
.then(()=>{
    console.log('conectamos ao MONGODB')
    app.listen(3000)
})
.catch((error) => console.log(error))



