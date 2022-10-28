const mongoose = require('mongoose')

const DB =
  'mongodb+srv://prakash:prak1234@cluster0.nbtkiwp.mongodb.net/commerce?retryWrites=true&w=majority'

const con = mongoose.connect(DB).then(() => console.log('connected'))
