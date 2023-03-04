import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import Menu from "../../components/Menu";
import { getCurrentUser } from "../../slices/authSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, data } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    !isLoading && !data && navigate("/");
  }, [isLoading, data]);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-800">
      <Menu />
      <div className="grow w-full h-full flex items-center justify-center text-white">
        <div className="flex flex-col text-center gap-4">
          <h1 className="text-2xl">DASHBOARD</h1>
          <p>{data && data.user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
