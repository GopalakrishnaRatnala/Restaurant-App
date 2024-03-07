import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, restaurantName} = value
        const cartCount = cartList.reduce(
          (accumulator, currentValue) => accumulator + currentValue.quantity,
          0,
        )
        return (
          <nav className="nav-container">
            <Link to="/" className="nav-link">
              <h1 className="restaurant-name">{restaurantName}</h1>
            </Link>
            <div className="logout-cart-container">
              <div className="cart-myOrders-container">
                <p className="myOrders-text">My Orders</p>
                <Link to="/cart" className="nav-link">
                  <button
                    type="button"
                    data-testid="cart"
                    className="cart-button"
                  >
                    {' '}
                    <AiOutlineShoppingCart className="cart-icon" />
                  </button>
                </Link>
                <span className="cart-count-badge">{cartCount}</span>
              </div>
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
