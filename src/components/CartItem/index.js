import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props

      const dishId = cartItemDetails.dish_id
      const dishImg = cartItemDetails.dish_image
      const dishName = cartItemDetails.dish_name
      const dishPrice = cartItemDetails.dish_price
      const dishCurrency = cartItemDetails.dish_currency
      const {quantity} = cartItemDetails

      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }

      const onIncrementCartItemQuantity = () => {
        incrementCartItemQuantity(dishId)
      }

      const onDecrementCartItemQuantity = () => {
        decrementCartItemQuantity(cartItemDetails)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImg} alt={dishName} />
          <div className="cart-item-details-container">
            <p className="cart-product-title">{dishName}</p>

            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementCartItemQuantity}
                data-testid="minus"
              >
                -
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementCartItemQuantity}
                data-testid="plus"
              >
                +
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">
                {dishCurrency} {dishPrice * quantity}/-
              </p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            data-testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
            {}
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
