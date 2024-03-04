import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'

const Header = props => {
  const {cartCount, restaurantName} = props
  return (
    <nav className="nav-container">
      <h1>{restaurantName}</h1>
      <div className="cart-myOrders-container">
        <p className="myOrders-text">My Orders</p>
        <AiOutlineShoppingCart className="cart-icon" />
        <span className="cart-count-badge">{cartCount}</span>
      </div>
    </nav>
  )
}

export default Header
