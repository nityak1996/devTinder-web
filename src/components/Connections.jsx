import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No connection found </h1>;

  return (
    <div className=" text-center  my-10 ">
      <h1 className="text-bold text-3xl text-white">Connections</h1>
      {connections.map((connection, index) => {
        const { firstName, lastName, photoUrl, about, id,age, gender } = connection;

        return (
          <div className="m-4 p-4 rounded-lg bg-base-300 flex w-1/2 mx-auto"  key={id || index}>
            <div >
              <img alt="photo" className="w-20 h-20 rounded-full"  src={photoUrl} />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
             {age && gender && <p >{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
