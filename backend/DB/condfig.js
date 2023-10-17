const mongoose = require('mongoose')

const DB =
  ''

const con = mongoose.connect(DB).then(() => console.log('connected'))
