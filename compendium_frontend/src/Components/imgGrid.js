import "./imgGrid.css"
import EditBtn from "./EditBtn";

const ImgGrid = ({postArray, db_url, reloadPosts, handleEditClick}) => {

  if (!Array.isArray(postArray)) {
      return(
          <p>No data, postArray is {postArray}</p>
      )
  }
  return (
  <div className="gridContainer">
    {postArray.map((item) => (
      <div key={item.id} className="gridItem">
        <div className="imageWrapper">
          <p className="textStyle">{item.name}</p>
          <div className="editBtn">...</div>
          <a href={item.link} className="postLink" draggable="false" target="_blank"></a>
          <div className="shade"></div>
          <EditBtn post={item} reloadPosts={reloadPosts} handleEditClick={handleEditClick}/>
          <img src={db_url + "/api/v1/imageGet?id=" + item.id} alt={item.name}
                className="gridImg"/>
        </div>
      </div>
    ))}
  </div>
  );
}

export default ImgGrid;