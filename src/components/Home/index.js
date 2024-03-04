import {Component} from 'react'

import './index.css'
import Header from '../Header'
import TabItem from '../TabItem'
import MenuItem from '../MenuItem'

class Home extends Component {
  state = {
    tabItems: [],
    menuCategory: '',
    cartCount: 0,
    tableMenu: [],
    restaurantName: '',
  }

  componentDidMount() {
    this.getDishDetails()
  }

  getDishDetails = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.map(eachObj => {
      console.log('co')
      return {
        branchName: eachObj.branch_name,
        nextUrl: eachObj.nexturl,
        restaurantId: eachObj.restaurant_id,
        restaurantImage: eachObj.restaurant_image,
        restaurantName: eachObj.restaurant_name,
        tableId: eachObj.table_id,
        tableMenuList: eachObj.table_menu_list,
        tableName: eachObj.table_name,
      }
    })
    this.setState({
      tableMenu: updatedData[0].tableMenuList,
      menuCategory: updatedData[0].tableMenuList[0].menu_category,
      tabItems: updatedData[0].tableMenuList.map(item => item.menu_category),
      restaurantName: updatedData[0].restaurantName,
    })
  }

  changeCategory = category => {
    this.setState({menuCategory: category})
  }

  onClickAddCart = (id, array) => {
    console.log(array)
    this.setState(prevState => ({cartCount: prevState.cartCount + 1}))
  }

  onClickRemoveCart = (id, array) => {
    console.log(array)
    const index = array.findIndex(eachItem => eachItem.dish_id === id)
    const reqDishObj = array[index]
    console.log(reqDishObj.quantity)
    if (reqDishObj.quantity !== 0) {
      this.setState(prevState => ({
        cartCount: prevState.cartCount > 0 ? prevState.cartCount - 1 : 0,
      }))
    }
  }

  render() {
    const {
      tableMenu,
      menuCategory,
      cartCount,
      tabItems,
      restaurantName,
    } = this.state
    return (
      <>
        <Header cartCount={cartCount} restaurantName={restaurantName} />
        <ul className="tabs-container">
          {tabItems.map(eachTab => (
            <TabItem
              eachTab={eachTab}
              key={eachTab}
              changeCategory={this.changeCategory}
            />
          ))}
        </ul>
        <ul className="menu-items-container">
          {tableMenu.map(
            eachMenuItem =>
              menuCategory === eachMenuItem.menu_category && (
                <MenuItem
                  key={eachMenuItem.menu_category_id}
                  eachMenuItem={eachMenuItem}
                  onClickAddCart={this.onClickAddCart}
                  onClickRemoveCart={this.onClickRemoveCart}
                />
              ),
          )}
        </ul>
      </>
    )
  }
}

export default Home
