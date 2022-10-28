import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products', {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
    const results = await result.json()
    setProducts(results)
  }
  console.log(products)

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: 'Delete',
    })

    const results = await result.json()
    if (results) {
      alert('record deleted')
      getProducts()
    }
  }

  const searchHandle = async (event) => {
    let key = event.target.value
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`)
      const results = await result.json()
      if (results) {
        setProducts(results)
      }
    } else {
      getProducts()
    }
  }
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        className="input-search"
        type="text"
        placeholder="Search Products"
        onChange={searchHandle}
      />
      <ul>
        <li>S no.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operations</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={'/update/' + item._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1> no result found</h1>
      )}
    </div>
  )
}

export default ProductList
