import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import './SignUp.css'
const UpdateProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [company, setCompany] = useState('')
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(params)
    getProductDetails()
  })

  const getProductDetails = async () => {
    console.log(params)
    const result = await fetch(`http://localhost:5000/products/${params.id}`)
    const results = await result.json()
    setCompany(results.company)
    setCategory(results.category)
    setName(results.name)
    setPrice(results.price)
  }

  const updateProduct = async () => {
    const result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'put',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const results = await result.json()
    if (results) {
      navigate('/')
    }
  }

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        className="input-box"
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => {
          setName(e.target.value)
        }}
        value={name}
      />

      <input
        className="input-box"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.value)
        }}
        value={price}
      />

      <input
        className="input-box"
        type="text"
        placeholder="Enter Product category"
        onChange={(e) => {
          setCategory(e.target.value)
        }}
        value={category}
      />

      <input
        className="input-box"
        type="text"
        placeholder="Enter Product company"
        onChange={(e) => {
          setCompany(e.target.value)
        }}
        value={company}
      />

      <button onClick={updateProduct} className="add-button">
        Add
      </button>
    </div>
  )
}

export default UpdateProduct
