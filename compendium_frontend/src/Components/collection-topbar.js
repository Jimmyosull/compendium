import "./collection-topbar.css"


const CollectionTopbar = ({handleAddClick}) => {

    return (
    <div className="bar">
        <div className="leftSide button">Filter</div>
        <input className="searchBar"></input>
        <div className="leftSide button">
            Search
        </div>
        <div className="leftPad"/>
        <div className="addButton button" onClick={handleAddClick}>Add item</div>
    </div>
    )
};

export default CollectionTopbar;