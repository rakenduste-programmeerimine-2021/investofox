const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const jwtAuth = require("./middleware/jwtAuth")
require("dotenv").config()
const cors = require('cors');
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const axios = require('axios')

const corsOptions = {
  origin: 'http://localhost:3000',
}

const app = express()
//this will convert the request into json, since node doesn't accept json by default
app.use(express.json());
//this will enable cors on localhost
app.use(cors(corsOptions));


app.use('/api/auth', authRoutes)
app.use('/portfolio', jwtAuth)
app.use('/api/order', orderRoutes)

app.get('/secret', jwtAuth, (req, res) => {
  res.send('Secret Hello World!')
})
//fetch testing
app.use('/stock', jwtAuth, function(req, res, next) {
  const apikey = "M7DSRJECMBCEEWGF";
  const ticker = ['MSFT']

  let completed = 0;
  const results = [];
  console.log(ticker);
  for (let i = 0; i < ticker.length; i++) {
    const oneTicker = ticker[i];

    axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apikey}`
      )
    .then((response) => {
      completed += 1;

      results.push(response.data);
      if (completed === ticker.length) {
        //All ticker have finished their response
        console.log("completed");

        res.send({
          success: true,
          message: "Ticker info",
          results,
        });
      }

      console.log(ticker);
    })
    .catch((e) => {
      console.error(e);
    });
  }
})

app.get('/auth', jwtAuth, (req, res) => {
  res.status(200).send("Welcome home, cowboy")
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/secret', jwtAuth, (req, res) => {
  res.send('Secret Hello World!')
})

app.get('*', (req, res) => {
  res.send('This route does not exist')
})

//Heroku dep
if(process.env.NODE_ENV == 'production') {
  app.use(express.static('frontend/build'))
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })