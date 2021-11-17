const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
//const jwtAuth = require("./middleware/jwtAuth")
//require("dotenv").config()


const app = express()
//this will convert the request into json, since node doesn't accept json by default
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('*', (req, res) => {
  res.send('This route does not exist')
})

app.get('/api/registration', (req, res) => {
  res.send('This is the response from user registration')
})

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