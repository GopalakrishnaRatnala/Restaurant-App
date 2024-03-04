import {Component} from 'react'
import './index.css'
import {BiFoodTag} from 'react-icons/bi'

class MenuItem extends Component {
  constructor(props) {
    super(props)
    const {eachMenuItem} = props
    const updatedCategory = eachMenuItem.category_dishes.map(eachItem => ({
      ...eachItem,
      quantity: 0,
    }))
    this.state = {categoryDishes: updatedCategory}
  }

  onDecrement = async dishId => {
    const {onClickRemoveCart} = this.props
    const {categoryDishes} = this.state
    await this.setState(
      prevState => ({
        categoryDishes: prevState.categoryDishes.map(eachItem => {
          if (eachItem.dish_id === dishId && eachItem.quantity > 0) {
            return {
              ...eachItem,
              quantity: eachItem.quantity - 1,
            }
          }
          return eachItem
        }),
      }),
      () => {
        this.onDecrement()
        onClickRemoveCart(dishId, categoryDishes)
      },
    )
  }

  onIncrement = async dishId => {
    const {onClickAddCart} = this.props
    const {categoryDishes} = this.state
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
    onClickAddCart(dishId, categoryDishes)
  }

  render() {
    const {categoryDishes} = this.state
    return (
      <>
        {categoryDishes.map(eachItem => (
          <li key={eachItem.dish_id} className="menu-item-container">
            <BiFoodTag className="food-tag" />
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
                    onClick={() => this.onDecrement(eachItem.dish_id)}
                  >
                    -
                  </button>
                  <p className="quantity-text">{eachItem.quantity}</p>
                  <button
                    type="button"
                    className="button"
                    onClick={() => this.onIncrement(eachItem.dish_id)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <p className="not-available-text">Not available</p>
              )}
              {eachItem.addonCat.length !== 0 && (
                <p className="customization-text">Customizations available</p>
              )}
            </div>
            <p className="calories-text">{`${eachItem.dish_calories} calories`}</p>
            <img src={eachItem.dish_image} alt="" className="dish-image" />
          </li>
        ))}
      </>
    )
  }
}

export default MenuItem
