import { useState } from "react";
import "./overlay.css"


const EditOverlay = ({post, closeEditOverlay, reloadPosts}) => {
  const [inputName, setInputName] = useState(post.name)
  const [inputLink, setInputLink] = useState(post.link)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleNameChange = (e) => {setInputName(e.target.value)}
  const handleLinkChange = (e) => {setInputLink(e.target.value)}
  const handleFileChange = (e) => {setSelectedFile(e.target.files[0])}

  const sendUpdatedPost = async () => {
    let newPost = post;
    // send data
    const response = await fetch('http://localhost:8001/api/v1/update?id=' + newPost.id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newPost),
    });
    if (!response.ok) {
      console.log("Response was not ok, status: ", response.status)
    }
    const result = await response.json();
    
    // send img
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile)
      const r = await fetch('http://localhost:8001/api/v1/imageUpdate?id='+result.id, {
        method: 'POST',
        body: formData
      })
      if (!r.ok) {
        console.log("Failed to upload img, response", r.statusText)
      }
      setSelectedFile(null)
    }
    
    closeEditOverlay();
    reloadPosts();
  }


  return(
    <div className="overlay">
      <div className="inputArea">
      <p>Edit post: {post.name}!</p>
        <p className="input">
          Name: <input type="text" value={inputName}  onChange={handleNameChange}></input><br/>
        </p>
        <p className="input">
          Link: <input type="text" value={inputLink} onChange={handleLinkChange}></input><br/>
        </p>
        <p className="dropZone"
          onDragOver={(e) => e.preventDefault()}>
          Image: <input type="file" onChange={handleFileChange} accept="image/*"></input>
        </p>
        <div style={{display: "flex"}}>
          <div className="button" onClick={sendUpdatedPost} style={{flex: .5}}>Save Changes</div>
          <div onClick={closeEditOverlay} className="button" style={{flex: .5}}>Close!</div>
        </div>
      </div>
    </div>
  )
};

export default EditOverlay;