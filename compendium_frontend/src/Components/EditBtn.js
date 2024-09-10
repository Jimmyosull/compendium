import "./EditBtn.css"

const EditBtn = ({post, reloadPosts, handleEditClick}) => {
  const deleteItem = async () => {
    const response = await fetch('http://localhost:8001/api/v1/delete?id=' + post.id, {
      method: 'GET'
    })
    if (!response.ok) {
      console.log("Deletion response not ok, status: ", response.status)
    }
    reloadPosts()
  }
  
  return (
    <>
      <div className="editBtn">...
        <div className="menuBox">
          <li className="menuItem deleteItem" onClick={deleteItem}>
            Delete
          </li>
          <li className="menuItem">
            <a href={"http://localhost:8001/api/v1/imageGet?id=" + post.id} target="_blank" className="menuItem" style={{borderStyle: "none"}}>
              Image
            </a>
          </li>
          <li className="menuItem" onClick={(e) => {handleEditClick(post);}}>
            Edit
          </li>
        </div>
      </div>
    </>
  )
}

export default EditBtn;