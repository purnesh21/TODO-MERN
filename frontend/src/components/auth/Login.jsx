import { Button } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../config";
import { useAppContext } from "../../context/AuthContext";

const LoginPage = () => {
  const { token, setToken } = useAppContext();

  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/profile");
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setloginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log(loginForm);
    event.preventDefault();
    try {
      const response = await axios.post(`${SERVER}/auth/login`, loginForm);
      const data = response.data;

      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setSuccess(true);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message || "Error logging in user");
    }
  };

  return (
    <div className="landing-home main">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow w-full">
        <h1 className="text-3xl font-bold mb-4">LogIn</h1>
        {success ? (
          <p className="text-green-500">Registration successful!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <Button type="primary" className="w-full" onClick={handleSubmit}>
              Login
            </Button>

            <label htmlFor="">
              New to platform? <Link to="/register">register here.</Link>
            </label>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
