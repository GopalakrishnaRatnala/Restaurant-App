import {Component} from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'

import './App.css'

import Home from './components/Home'

import LoginForm from './components/LoginForm'

import Cart from './components/Cart'

import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: [], restaurantName: ''}

  addCartItem = menuItem => {
    this.setState(prevState => ({cartList: [...prevState.cartList, menuItem]}))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachItem => eachItem.dish_id !== id)
    this.setState({cartList: filteredList})
  }

  incrementCartItemQuantity = id => {
    console.log(id)
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(eachItem => {
        if (eachItem.dish_id === id) {
          console.log(eachItem.quantity)
          return {
            ...eachItem,
            quantity: eachItem.quantity + 1,
          }
        }
        return eachItem
      })

      return {
        cartList: updatedCartList,
      }
    })
  }

  decrementCartItemQuantity = object => {
    if (object.quantity > 1) {
      this.setState(prevState => {
        const updatedCartList = prevState.cartList.map(eachItem => {
          if (eachItem.dish_id === object.dish_id) {
            if (eachItem.quantity > 1) {
              return {
                ...eachItem,
                quantity: eachItem.quantity - 1,
              }
            }
          }
          return eachItem
        })
        return {
          cartList: updatedCartList,
        }
      })
    } else {
      this.removeCartItem(object.dish_id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addRestaurantName = name => {
    this.setState({restaurantName: name})
  }

  render() {
    const {cartList, restaurantName} = this.state
    console.log(restaurantName)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          addRestaurantName: this.addRestaurantName,
          restaurantName,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
