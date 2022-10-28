const express = require('express')
const cors = require('cors')
require('./DB/condfig')
const User = require('./DB/User')
const Product = require('./DB/Product')
const jwt = require('jsonwebtoken')

const jwtKey = 'e-com'
const app = express()
app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
  const user = await User.create(req.body)
  result = user.toObject()
  delete result.password
  jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
    if (err) {
      res.send({ result: 'something went wrong' })
    }
    res.send({ result, auth: token })
  })
})

app.post('/login', async (req, res) => {
  if (req.body.email && req.body.email) {
    let user = await User.findOne(req.body).select('-password')
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
          res.send({ result: 'something went wrong' })
        }
        res.send({ user, auth: token })
      })
    } else {
      res.send('not valid')
    }
  } else {
    res.send('enter valid details')
  }
})

app.post('/add-product', async (req, res) => {
  let product = new Product(req.body)
  let result = await product.save()
  res.send(result)
})

app.get('/products', async (req, res) => {
  let products = await Product.find()
  if (products.length > 0) {
    res.send(products)
  } else {
    res.send({ result: 'no result found' })
  }
})

app.delete('/product/:id', verifyToken, async (req, res) => {
  const id = req.params.id
  const result = await Product.deleteOne({ _id: id })
  res.send(result)
})

app.get('/products/:id', verifyToken, async (req, res) => {
  const id = req.params.id
  let result = await Product.findOne({ _id: id })
  if (result) {
    res.send(result)
  } else {
    res.send('no result found')
  }
})

app.put('/product/:id', verifyToken, async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body },
  )

  res.send(result)
})

app.get('/search/:key', verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  })

  res.send(result)
})

function verifyToken(req, res, next) {
  let token = req.header('Authorization')
  if (token) {
    token = token.split(' ')[1]

    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.send('please provide valid token')
      } else {
      }
    })
  } else {
    res.send('Please add token in header')
  }

  next()
}

app.listen(5000, () => {
  console.log('server started')
})
