import axios from "axios";
import { Fragment, useState } from "react";
import User from "../../../models/user";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from '../../../shared/formElements/Input';

type RegistrationProps = { currentFormHandler: () => void };

const Registration = ({currentFormHandler}: RegistrationProps) => {
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: '',
      },
      email: {
        value: '',
      },
      password: {
        value: '',
      },
      confirm_password: {
        value: '',
      },
    },
  );

  const handleRegisterSubmit = async (event: any) => {
    event.preventDefault();
    if(formState.inputs.password.value === formState.inputs.confirm_password.value) {
      const user: User = new User(formState.inputs.username.value, formState.inputs.email.value, formState.inputs.password.value);
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
          <Input 
            id="username"
            type="text"
            label="Username"
            placeholder="John"
            errorText="Username is required"
            onInput={inputHandler}/>
        </div>
        <div className="mb-6">
        <Input 
            id="email"
            type="text"
            label="Email"
            placeholder="john@email.com"
            errorText="Email is required"
            onInput={inputHandler}/>
        </div>
        <div className="mb-6">
        <Input 
            id="password"
            type="password"
            label="Password"
            placeholder="********"
            errorText="Password is required"
            onInput={inputHandler}/>
        </div>
        <div className="mb-6">
        <Input 
            id="confirm_password"
            type="password"
            label="Confirm Password"
            placeholder="********"
            errorText="Password is required"
            onInput={inputHandler}/>
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
