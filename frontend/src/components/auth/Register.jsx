import { Button } from "antd";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER } from "../../config";
import { useAppContext } from "../../context/AuthContext";

const RegisterPage = () => {
  const { token } = useAppContext();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (token) navigate("/profile");
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log(registerForm);
    event.preventDefault();
    try {
      setLogin(true);
      const response = await axios.post(
        `${SERVER}/auth/register`,
        registerForm
      );
      const data = response.data;

      if (data.success) {
        setSuccess(true);
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Error logging in user");
      F;
      console.log(error);
    } finally {
      setLogin(false);
    }
  };

  return (
    <div className="landing-home main">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow w-full">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        {success ? (
          <p className="text-green-500">Registration successful!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                value={registerForm.username}
                onChange={handleInputChange}
              />
            </div>
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
                value={registerForm.email}
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
                value={registerForm.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <Button
              type="primary"
              className="w-full"
              onClick={handleSubmit}
              loading={login}
            >
              Register
            </Button>

            <label htmlFor="">
              Already having acoount? <Link to="/">loging here.</Link>
            </label>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
