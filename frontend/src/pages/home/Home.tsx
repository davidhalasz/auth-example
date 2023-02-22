import Menu from "../../components/Menu";

const Home = () => {
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