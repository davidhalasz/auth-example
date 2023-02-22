import { useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";

const LOGIN_STYLE = 'absolute z-20 w-[450px] h-[350px] shadow-xl';
const REGISTER_STYLE = 'absolute z-20 w-[450px] h-[500px] shadow-xl';
const LOGIN_BG_TRANSITION = {maxHeight: "200px", transition: "max-height 0.15s ease-in"};
const REGISTER_BG_TRANSITION = {maxHeight: "350px", transition: "max-height 0.15s ease-in"};

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentFormHandler = () => {
    if (location.pathname === "/login") {
      navigate('/register');
    } else {
      navigate('/login')
    }
  };

  return (
    <div className="relative h-screen w-screen bg-slate-800 flex items-center justify-center">
      <div className={location.pathname === '/register' ? REGISTER_STYLE : LOGIN_STYLE}>
        <div className="relative h-full w-full">
          <div className="absolute z-20 h-full w-full">
            <div className="h-1/4 w-full bg-customColor1"></div>
            <div className="h-1/4 w-full bg-customColor2"></div>
            <div className="h-1/4 w-full bg-customColor3"></div>
            <div className="h-1/4 w-full bg-customColor4"></div>
          </div>
          <div className="absolute z-30 h-full w-full p-4">
            {location.pathname === "/register" ? (
              <Registration currentFormHandler={currentFormHandler} />
            ) : (
              <Login currentFormHandler={currentFormHandler} />
            )}
          </div>
        </div>
      </div>
      <div style={location.pathname === '/register' ? REGISTER_BG_TRANSITION : LOGIN_BG_TRANSITION} className="absolute z-10 w-full h-[300px]">
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
