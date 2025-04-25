import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(`${err} has been found`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return <h1 className="text-center text-2xl mt-10 text-gray-400">No request is found. 😞</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl text-white mb-8">Connection Requests</h1>
      {requests.map((request, index) => {
        const {
          firstName,
          lastName,
          photoUrl,
          about,
          age,
          gender,
          _id,
        } = request?.fromUserId || {};

        return (
          <div
            className="flex items-center justify-between m-4 p-4 rounded-lg bg-base-300 w-11/12 md:w-3/5 mx-auto shadow-lg"
            key={_id || index}
          >
            <div className="flex items-center gap-4">
              <img
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl || "https://via.placeholder.com/80"}
              />
              <div className="text-left">
                <h2 className="font-bold text-xl text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p className="text-gray-300">{age}, {gender}</p>}
                {about && <p className="text-gray-400">{about}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn btn-outline btn-error">Reject</button>
              <button className="btn btn-outline btn-success">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
