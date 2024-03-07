import './index.css'

const TabItem = props => {
  const {eachTab, changeCategory, menuCategory} = props
  const selectMenuItem = () => {
    changeCategory(eachTab)
  }
  return (
    <button
      type="button"
      className={`tab-button ${menuCategory === eachTab && 'selected-tab'}`}
      onClick={selectMenuItem}
    >
      {eachTab}
    </button>
  )
}

export default TabItem
