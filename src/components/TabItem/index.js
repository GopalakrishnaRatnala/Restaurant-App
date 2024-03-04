import './index.css'

const TabItem = props => {
  const {eachTab, changeCategory} = props
  const selectMenuItem = () => {
    changeCategory(eachTab)
  }
  return (
    <button type="button" className="tab-button" onClick={selectMenuItem}>
      {eachTab}
    </button>
  )
}

export default TabItem
