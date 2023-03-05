import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/store";
import { resetMessage } from "../../slices/authSlice";
import "./snackbar.css";

const Snackbar = () => {
  const [show, setShow] = useState(false);
  const { message, isSuccess } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  useEffect(() => {
    console.log("called");
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        dispatch(resetMessage());
      }, 3800);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <div className="absolute z-10 top-[30px] w-full">
      <div
        ref={nodeRef}
        className={`rounded-md p-3 text-center mx-auto w-fit snackbar ${
          show ? "show" : "hidden"}
          ${isSuccess ? "bg-green-200" : "bg-red-200"}`}
      >
        {message ? message : ""}
      </div>
    </div>
  );
};

export default Snackbar;
