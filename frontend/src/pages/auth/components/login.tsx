
import { Fragment } from "react";
import { useAppDispatch } from "../../../app/store";
import Input from "../../../shared/formElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import { loginType, loginUser } from "../../../slices/authSlice";
type LoginProps = { currentFormHandler: () => void };

const Login = ({ currentFormHandler }: LoginProps) => {
  const dispatch = useAppDispatch();
  
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleLoginSubmit = (event: any) => {
    event.preventDefault();
    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;
    const credentials: loginType = {email, password};
    dispatch(loginUser(credentials));
  };

  return (
    <Fragment>
      <h1 className="text-4xl font-extrabold text-center text-slate-800">
        Login
      </h1>
      <form onSubmit={handleLoginSubmit}>
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
            errorText="Password field is required"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
        </div>
        <div className="grid grid-cols-2 pt-10">
          <button
            type="button"
            className="font-bold text-slate-800 hover:text-customColor1 text-lg"
            onClick={currentFormHandler}
          >
            Go to Register form
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

export default Login;
