import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";

const Menu = () => {
  const navigate = useNavigate();
  const { isLoggedIn, data } = useAppSelector((state) => state.auth);

  return (
    <div className="container mx-auto w-full flex justify-between p-2 text-white font-lg">
      <div>LOGO</div>
      <div className="flex gap-4">
        {!isLoggedIn && (
          <Fragment>
            <button onClick={() => navigate("/login")}>Login</button>

            <button onClick={() => navigate("/register")}>Register</button>
          </Fragment>
        )}
        {isLoggedIn && (
          <Fragment>
            <p>{data.user.username}</p>
            <button>Logout</button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Menu;
