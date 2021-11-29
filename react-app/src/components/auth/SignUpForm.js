import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');      
  const [image, setImage] = useState(null); 
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [bio, setBio] = useState();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [uploadMsg, setUploadMsg] = useState("Upload Profile Picture");
  const [showErrors, setShowErrors] = useState(false);


  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("email", email);
      formData.append("avatar", image);
      formData.append("f_name", fname);
      formData.append("l_name", lname);
      formData.append("bio", bio);
      formData.append("password", password);
      

      const data = await dispatch(signUp(formData));


      if (data) {
        setShowErrors(true);
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFname = (e) => {
    setFname(e.target.value);
  };

  const updateLname = (e) => {
    setLname(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];

    setUploadMsg(file["name"]);

    setImage(file);
  };


  let ButtonDisable = true;   
  if ( username && email && fname && lname && password && repeatPassword) ButtonDisable = false;  
    
  if (user) {
    return <Redirect to='/Home' />;
  }

  return (
    <>
      <form className="outerContainer" onSubmit={onSignUp}>
          {showErrors && (
            <div className="errorsContainer">
              {errors.map((error, ind) => (
                <div className="errors" key={ind}>
                  {error}
                </div>
              ))}
            </div>
          )}

        <div className="topInnerContainer">
            <div className="title1 logo">Welcome</div>
                <div className="subtitle">Sign up to see photos from your friends.</div> 
            <div className="inputsContainer text-field">  
        <div>
            <input
              className="inputContainer inputText"
              type="text"
              placeholder="Username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>

          <div>
            <input
              className="inputContainer inputText"
              type="email"
              placeholder="Email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="text"
              placeholder="First Name"
              onChange={updateFname}
              value={fname}
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="text"
              placeholder="Last Name"
              onChange={updateLname}
              value={lname}
            ></input>
          </div>

        
            <input
              className="inputContainer"
              type="text"
              placeholder="Bio"
              onChange={updateBio}
              value={bio}
            ></input>
          </div>

          <div className="uploadDiv fileinputs">
            <input
              className="inputContainer file"
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <div class="inputContainer fakefile">
              <label className="uploadLabel">{uploadMsg}</label>
              <div className="uploadPic">
              </div>
            </div>  
          </div>
          <div>
            <input
              className="inputContainer"
              type="password"
              placeholder="Password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="password"
              placeholder="Repeat Password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>   

          <div className="btnContainer2">
          <button type="submit" className="signUpBtn">
            Sign Up  
          </button> 
        </div>
        </div>

       
    </form>


  </>
  );
};

export default SignUpForm;
