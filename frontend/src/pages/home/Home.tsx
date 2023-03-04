import { useEffect } from "react";
import { useAppDispatch } from "../../app/store";
import Menu from "../../components/Menu";
import { getCurrentUser } from "../../slices/authSlice";

const Home = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);
    
    return (
        <div className="h-screen w-screen flex flex-col bg-slate-800">
            <Menu />
            <div className="grow w-full h-full flex items-center justify-center text-white">
                HELLO
            </div>
        </div>
    );
}

export default Home;