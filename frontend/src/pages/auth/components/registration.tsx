import { Fragment, useEffect } from "react";
import User from "../../../models/user";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/formElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { getCurrentUser, registerUser } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";

type RegistrationProps = { currentFormHandler: () => void };

const Registration = ({ currentFormHandler }: RegistrationProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {isLoading, isSuccess, data} = useAppSelector(state => state.auth);
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirm_password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    !isLoading && data && navigate("/dashboard");
  }, [isLoading, data, navigate]);

  const handleRegisterSubmit = async (event: any) => {
    event.preventDefault();
    if (formState.isValid) {
      if (
        formState.inputs.password.value ===
        formState.inputs.confirm_password.value
      ) {
        const user: User = new User(
          formState.inputs.username.value,
          formState.inputs.email.value,
          formState.inputs.password.value
        );
        dispatch(registerUser(user));
      }
    }
  }; 

  return (
    <Fragment>
      <h1 className="text-4xl font-extrabold text-center text-slate-800">
        Registration
      </h1>
      <form onSubmit={handleRegisterSubmit}>
        <div className="mb-6">
          <Input
            id="username"
            type="text"
            label="Username"
            placeholder="John"
            errorText="Username is required"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
        </div>
        <div className="mb-6">
          <Input
            id="email"
            type="text"
            label="Email"
            placeholder="john@email.com"
            errorText="Email is required"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          />
        </div>
        <div className="mb-6">
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="********"
            errorText="Password must be at least 5 characters"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          />
        </div>
        <div className="mb-6">
          <Input
            id="confirm_password"
            type="password"
            label="Confirm Password"
            placeholder="********"
            errorText="Password must be at least 5 characters"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          />
        </div>
        <div className="grid grid-cols-2">
          <button
            type="button"
            className="font-bold text-slate-800 hover:text-customColor1 text-lg"
            onClick={currentFormHandler}
          >
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
