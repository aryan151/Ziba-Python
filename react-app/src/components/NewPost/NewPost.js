import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {addPost, findUserPosts} from '../../store/post';   
import './NewPost.css'
function NewPost() {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state?.session?.user);

    const [caption, setCaption] = useState("");  
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [tags, settags] = useState("");
    const [usertags, setUsertags] = useState("");   
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const updateImage = (e) => {
    const file = e.target.files[0];

    setSelectedFile(e.target.files[0]);

    setImage(file);
    };    

    const resetFields = () => {
        setCaption("");
        // setImageUrl("")
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append("caption", caption);
        formData.append("img_url", image);
        formData.append("user_id", user.id);
        formData.append("tags", tags); 
        formData.append("user_tags", usertags) 
    
        setImageLoading(true);
        await dispatch(addPost(formData)); 
        setImageLoading(false);
        dispatch(findUserPosts(user?.id)); 
    
        history.push("/");
    
        resetFields();
      };


    return (  
        <>
        <div className="outerContainer1">
          <div className="topContainer"> 
            <p className="header">Compose</p>
          </div>
  
          <div className="bottomContainer">
            <div className="leftContainer">
              {!preview && (
                <div className="input-file-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                    className="inpuut-file"
                    id="my-file"
                  />
  
                  <label tabindex="0" for="my-file" class="input-file-trigger blueButton button">
                    Select a file...
                  </label>
                </div>
              )}
  
              {preview && <img class="picToUpload pic2" src={preview} alt="picToUpload" />}
            </div>
  
            <div className="rightContainer">
              <div className="rightOne">
                <img src={user?.avatar} className="avatar" alt="userProfile"></img>
                <p className="username">{user?.username}</p>
              </div>
  
              <div className="rightTwo">
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="caption2"
                  placeholder="Write a caption..."
                />
              </div>
              <div className="rightFour">
                <input
                  placeholder="Add Hashtags..."
                  type="text"
                  value={tags}
                  onChange={(e) => settags(e.target.value)}
                  className="hashtags"
                />
                <p>seperate tag names by spaces</p>
              </div>
  
              <div className="emptyDiv divisor" />
  
              <div className="rightBtnContainer">
                {image && (
                  <button onClick={handleSubmit} className="btn blueButton button">
                    Share
                  </button>
                )}
                {!image && <button className="btn blueButton button disabled">Share</button>}
              </div>
            </div>
          </div>
  
          {imageLoading && (
            <div className="loadingModal">
              <div className="logo innerModal">
                Uploading <span class="dot-elastic2"></span>
              </div>
            </div>
          )}
        </div>
      </>
    );
};

export default NewPost;