import {Component} from 'react'

import './index.css'
import Header from '../Header'
import TabItem from '../TabItem'
import MenuItem from '../MenuItem'

import CartContext from '../../context/CartContext'

class Home extends Component {
  state = {
    tabItems: [],
    menuCategory: '',
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
    const {restaurantName} = this.state

    const {addRestaurantName} = this.context
    addRestaurantName(restaurantName)
  }

  changeCategory = category => {
    this.setState({menuCategory: category})
  }

  render() {
    return (
      <CartContext.Consumer>
        {() => {
          const {tableMenu, menuCategory, tabItems} = this.state
          return (
            <>
              <Header />
              <ul className="tabs-container">
                {tabItems.map(eachTab => (
                  <TabItem
                    eachTab={eachTab}
                    key={eachTab}
                    changeCategory={this.changeCategory}
                    menuCategory={menuCategory}
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
                      />
                    ),
                )}
              </ul>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

Home.contextType = CartContext

export default Home
