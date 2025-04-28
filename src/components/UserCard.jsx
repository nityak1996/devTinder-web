const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  console.log(user);
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="profile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>
            {age}, {gender}
          </p>
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-outline btn-error">Ignore</button>
            <button className="btn btn-outline btn-success">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
