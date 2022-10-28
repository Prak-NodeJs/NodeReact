import { Link, useNavigate } from 'react-router-dom'

import classes from './Nav.module.css'

const Nav = () => {
  const navigate = useNavigate()
  const auth = localStorage.getItem('user')

  const logout = () => {
    localStorage.clear()
    navigate('/signup')
  }

  return (
    <div>
      {auth ? (
        <ul className={classes['nav-ul']}>
          <li>
            <Link to="/product">Products</Link>
          </li>

          <li>
            <Link to="/add">Add Prduct</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={classes['nav-ul2']}>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Nav
