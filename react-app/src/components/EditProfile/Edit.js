import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { profileEdit } from "../../store/session";
import "./Edit.css"; 

const EditProfileForm = () => {
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState(""); 
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [bio, setBio] = useState(user.bio);
  const [uploadMsg, setUploadMsg] = useState("Upload Profile Picture"); 
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const onProfileEdit = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const formData = new FormData();

      formData.append("id", user.id);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("old_password", oldPassword);
      formData.append("password", password);
      formData.append("avatar", image);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("bio", bio);

      setImageLoading(true);
      const data = await dispatch(profileEdit(formData));
      setImageLoading(false);

      history.push(`/users/${user.id}`);

      if (data) {
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

  const updateOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  const updateImage = (e) => {
    const file = e.target.files[0];

    setUploadMsg(file["name"]);

    setImage(file);
  };

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className="editProfilePage">
      <div className="editProfileContainer"> 
        <div className="editLeftPanel">
          <ul>
            <li className="editPanelTab">Edit Profile</li>
          </ul>
        </div>

        <div className="editProfileBody">
          <div className="editRow">
            <div className="avatarContainer editProfilePage">
              <img src={user.avatar} alt="Avatar" />
            </div>
            <div className="userNameBox">
              <div className="userNameDisplay editProfilePage">{user.username}</div>
              <div className='invisible'>
                <button type="file" accept="image/*" className="editProfileImage textButton button">Change Profile Photo</button></div>
              </div>
          </div>

          <form onSubmit={onProfileEdit}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>

            <div className="editFormRow">
              <div className="editLabelContainer">
                <label>User Name</label>
              </div>

              <div className="editInputContainer">
                <input
                  type="text"
                  name="username"
                  onChange={updateUsername}
                  value={username}
                  placeholder="User Name"
                ></input>
              </div>
            </div>

            <div className="editFormRow">
              <div className="editLabelContainer">
                <label>Email</label>
              </div>

              <div className="editInputContainer">
                <input
                  type="text"
                  name="email"
                  onChange={updateEmail}
                  value={email}
                  placeholder="Email"
                ></input>
              </div>
            </div>

            <div className="editFormRow">
              <div className="editLabelContainer">
                <label>First Name</label>
              </div>

              <div className="editInputContainer">
                <input
                  type="text"
                  onChange={(e) => setFname(e.target.value)}
                  value={fname}
                  placeholder={user.f_name}
                ></input>
              </div>
            </div>

            <div className="editFormRow">
              <div className="editLabelContainer">
                <label>Last Name</label>
              </div>

              <div className="editInputContainer">
                <input
                  type="text"
                  onChange={(e) => setLname(e.target.value)}
                  value={lname}
                  placeholder={user.l_name}
                ></input>
              </div>
            </div>


            <div className="editFormRow">
              <div className="editLabelContainer">
                <label>Bio</label>
              </div>

              <div className="editInputContainer">
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  placeholder="Write a short biography!"
                ></textarea>
              </div>
            </div>

            <div className="editFormRow">
              <div className="editLabelContainer">
                <label>Password</label>
              </div>

              <div className="editInputContainer">
                <input
                  type="password"
                  name="old_password"
                  onChange={updateOldPassword}
                  value={oldPassword}
                  required={true}
                ></input>
              </div>
            </div>

            <div className="editFormRow">
              <div className="editLabelContainer">
                <label>New Password</label>
              </div>

              <div className="editInputContainer">
                <input
                  type="password"
                  name="password"
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
            </div>

            <div className="editFormRow">
              <div className="editLabelContainer">
                <label>Confirm Password</label>
              </div>

              <div className="editInputContainer">
                {/* If there's a value in the password field require the repeat password, otherwise don't require it */}
                {password ? (
                  <input
                    type="password"
                    name="repeat_password"
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                  ></input>
                ) : (
                  <input
                    type="password"
                    name="repeat_password"
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                  ></input>
                )}
              </div>
            </div>

            <div className="editFormRow">
              <div className="editLabelContainer">
                <label>Profile Picture</label>
              </div>

              <div className="editInputContainer">
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="editFormRow">
              <div className="editLabelContainer"></div>
              <div className="editInputContainer">
                  {(user.username === 'Demo' || user.username === 'Demo2') ? <p> You Cannot Edit The Demo Users!</p> : 
                  <button type="submit" class="button blueButton">Submit</button> }
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> 
    </>
  );
};

export default EditProfileForm;