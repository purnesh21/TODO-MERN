import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";

const Profile = () => {
  const { token, user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
  }, []);
  return (
    <div className="main landing-home">
      <div className="text-center p-6  rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">
          Hello, {user?.username}!
        </h1>
        <Link
          to="/todos"
          className="mt-4 inline-block px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
        >
          Go To ToDos
        </Link>
      </div>
    </div>
  );
};

export default Profile;
