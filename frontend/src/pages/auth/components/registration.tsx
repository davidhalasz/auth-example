import axios from "axios";
import { Fragment, useState } from "react";
import User from "../../../models/user";
type RegistrationProps = { currentFormHandler: () => void };

const Registration = ({currentFormHandler}: RegistrationProps) => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleFormChange = (event: any) => {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value
    });
  } 

  const handleRegisterSubmit = async (event: any) => {
    event.preventDefault();
    if(formState.password === formState.confirm_password) {
      const user: User = new User(formState.username, formState.email, formState.password);
      try {
        let response = await axios.post("http://localhost:9000/api/auth/register", {
          ...user
        });
        console.log(response);
      } catch (error: any) {
        if(error.response) console.log(error.response.data.msg);
      }
    }
  }

  return (
    <Fragment>
      <h1 className="text-4xl font-extrabold text-center text-slate-800">Registration</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-slate-900"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            value={formState.username}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-slate-800"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            value={formState.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-slate-800"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            value={formState.password}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-slate-800"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            value={formState.confirm_password}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="grid grid-cols-2">
            <button type="button" className="font-bold text-slate-800 hover:text-customColor1 text-lg" onClick={currentFormHandler}>
                Go to login form 
            </button>
          <button
            type="submit"
            className="text-white hover:text-slate-800 bg-slate-800 hover:bg-customColor1 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center float-right"
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Registration;
