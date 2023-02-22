import { useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto w-full flex justify-between p-2 text-white font-lg">
            <div>LOGO</div>
            <div className="flex gap-4">
                <button onClick={() => navigate('/login')}>
                    Login
                </button>
                <button onClick={() => navigate('/register')}>
                    Register
                </button>
                <p>Username</p>
                <button>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Menu;