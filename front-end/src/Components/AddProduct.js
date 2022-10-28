import React, { useState } from 'react'
import './SignUp.css'
const AddProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState(false)

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true)
      return false
    }

    const userId = JSON.parse(localStorage.getItem('user'))._id

    const result = await fetch('http://localhost:5000/add-product', {
      method: 'post',
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const results = await result.json()
    console.log(results)

    setName('')
    setPrice('')
    setCategory('')
    setCompany('')
  }
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        className="input-box"
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => {
          setName(e.target.value)
        }}
        value={name}
      />
      {error && !name && <span>Enter valid Name</span>}
      <input
        className="input-box"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.value)
        }}
        value={price}
      />
      {error && !price && <span>Enter valid Price</span>}
      <input
        className="input-box"
        type="text"
        placeholder="Enter Product category"
        onChange={(e) => {
          setCategory(e.target.value)
        }}
        value={category}
      />
      {error && !category && <span>Enter valid category</span>}
      <input
        className="input-box"
        type="text"
        placeholder="Enter Product company"
        onChange={(e) => {
          setCompany(e.target.value)
        }}
        value={company}
      />
      {error && !company && <span>Enter valid Company</span>}
      <button onClick={addProduct} className="add-button">
        Add
      </button>
    </div>
  )
}

export default AddProduct
