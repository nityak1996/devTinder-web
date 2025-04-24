import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //clear the existing error.
    setError("");
    const payload = {
      firstName,
      lastName,
      gender,
      age,
      photoUrl,
      about,
    };

    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
    }
  };

  return (
    <>
      <div className="flex my-10  justify-center  ">
        <div className="flex justify-center  mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="">
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">PhotoUrl</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(event) => setPhotoUrl(event.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Age </span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(event) => setAge(event.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  value={about}
                  rows="4"
                  placeholder="Tell us about yourself..."
                  onChange={(event) => setAbout(event.target.value)}
                />
                </label>
                <p className="text-red-500">{error}</p>
              </div>

              <div className="card-actions justify-center m-2">
                <button
                  className="btn btn-active btn-accent"
                  onClick={saveProfile}
                >
                  Save Pofile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, about, gender, age }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>⚡ Profile updated! You're all set</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
