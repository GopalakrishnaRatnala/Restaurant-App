import {Component} from 'react'
import './index.css'
import {BiFoodTag} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

class MenuItem extends Component {
  constructor(props) {
    super(props)
    const {eachMenuItem} = props
    const updatedCategory = eachMenuItem.category_dishes.map(eachItem => ({
      ...eachItem,
      quantity: 0,
    }))
    this.state = {categoryDishes: updatedCategory}
    console.log(eachMenuItem)
  }

  onDecrementQuantity = async dishId => {
    await this.setState(prevState => ({
      categoryDishes: prevState.categoryDishes.map(eachItem => {
        if (eachItem.dish_id === dishId && eachItem.quantity > 0) {
          return {
            ...eachItem,
            quantity: eachItem.quantity - 1,
          }
        }
        return eachItem
      }),
    }))
  }

  onIncrementQuantity = async dishId => {
    await this.setState(prevState => ({
      categoryDishes: prevState.categoryDishes.map(eachItem => {
        if (eachItem.dish_id === dishId) {
          return {
            ...eachItem,
            quantity: eachItem.quantity + 1,
          }
        }
        return eachItem
      }),
    }))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {categoryDishes} = this.state
          const {addCartItem, cartList, incrementCartItemQuantity} = value
          const onClickAddToCart = cartItem => {
            const findId = cartList.find(
              eachItem => eachItem.dish_id === cartItem.dish_id,
            )
            if (findId === undefined) {
              addCartItem({...cartItem})
            } else {
              this.onIncrementQuantity(cartItem.dish_id)
              incrementCartItemQuantity(cartItem.dish_id)
            }
          }
          return (
            <>
              {categoryDishes.map(eachItem => (
                <li key={eachItem.dish_id} className="menu-item-container">
                  <BiFoodTag
                    className={`food-tag ${
                      eachItem.dish_Type === 2 ? 'veg' : 'non-veg'
                    }`}
                  />
                  <div className="item-details-container">
                    <h1 className="dish-name">{eachItem.dish_name}</h1>
                    <p className="dish-currency">
                      {`${eachItem.dish_currency} ${eachItem.dish_price}`}
                    </p>

                    <p className="description">{eachItem.dish_description}</p>
                    {eachItem.dish_Availability ? (
                      <div className="display-quantity-container">
                        <button
                          type="button"
                          className="button"
                          onClick={() =>
                            this.onDecrementQuantity(eachItem.dish_id)
                          }
                        >
                          -
                        </button>
                        <p className="quantity-text">{eachItem.quantity}</p>
                        <button
                          type="button"
                          className="button"
                          onClick={() =>
                            this.onIncrementQuantity(eachItem.dish_id)
                          }
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <p className="not-available-text">Not available</p>
                    )}
                    {eachItem.addonCat.length !== 0 && (
                      <p className="customization-text">
                        Customizations available
                      </p>
                    )}
                  </div>
                  <p className="calories-text">{`${eachItem.dish_calories} calories`}</p>
                  <div className="img-add-to-cart-button-container">
                    <img
                      src={eachItem.dish_image}
                      alt=""
                      className="dish-image"
                    />
                    {eachItem.quantity > 0 && (
                      <button
                        type="button"
                        className="add-to-cart-button"
                        onClick={() => onClickAddToCart(eachItem)}
                      >
                        ADD TO CART
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default MenuItem
