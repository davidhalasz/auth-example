import { useState } from "react";
import Login from "./components/login";
import Registration from "./components/registration";

const LOGIN_STYLE = 'absolute z-20 w-[450px] h-[350px] shadow-xl';
const REGISTER_STYLE = 'absolute z-20 w-[450px] h-[500px] shadow-xl';

const Auth = () => {
  const [currentForm, setCurrentForm] = useState("register");

  const currentFormHandler = () => {
    if (currentForm === "login") {
      setCurrentForm("register");
    } else {
      setCurrentForm("login");
    }
  };

  return (
    <div className="relative h-screen w-screen bg-slate-800 flex items-center justify-center">
      <div className={currentForm === 'register' ? REGISTER_STYLE : LOGIN_STYLE}>
        <div className="relative h-full w-full">
          <div className="absolute z-20 h-full w-full">
            <div className="h-1/4 w-full bg-customColor1"></div>
            <div className="h-1/4 w-full bg-customColor2"></div>
            <div className="h-1/4 w-full bg-customColor3"></div>
            <div className="h-1/4 w-full bg-customColor4"></div>
          </div>
          <div className="absolute z-30 h-full w-full p-4">
            {currentForm === "register" ? (
              <Registration currentFormHandler={currentFormHandler} />
            ) : (
              <Login currentFormHandler={currentFormHandler} />
            )}
          </div>
        </div>
      </div>
      <div className="absolute z-10 w-full h-[300px]">
        <div className="h-full w-full">
          <div className="h-1/4 w-full bg-customColor1"></div>
          <div className="h-1/4 w-full bg-customColor2"></div>
          <div className="h-1/4 w-full bg-customColor3"></div>
          <div className="h-1/4 w-full bg-customColor4"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
