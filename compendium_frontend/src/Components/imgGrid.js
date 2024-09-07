import "./imgGrid.css"

const ImgGrid = ({postArray, db_url}) => {

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
          <div className="shade"></div>
          <img src={db_url + "/api/v1/imageGet?id=" + item.id} alt={item.name}
                className="gridImg"/>
        </div>
      </div>
    ))}
  </div>
  );
}

export default ImgGrid;