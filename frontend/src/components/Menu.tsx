import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { logout } from "../slices/authSlice";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, data } = useAppSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout)
  }

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
            <button type="button" onClick={() => logoutHandler()}>Logout</button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Menu;
