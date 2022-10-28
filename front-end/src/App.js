import './App.css'

import Nav from './Components/Nav'
import Footer from './Components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './Components/SignUp'
import PrivateComponent from './Components/PrivateComponent'
import Login from './Components/Login'
import AddProduct from './Components/AddProduct'
import ProductList from './Components/ProductList'
import UpdateProduct from './Components/UpdateComponent'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/product" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>logout listening compomg</h1>} />
            <Route
              path="/profile"
              element={<h1>profile listening compomg</h1>}
            />
          </Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
