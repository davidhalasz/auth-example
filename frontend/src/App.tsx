import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";

function App() {
  let routes = createBrowserRouter([
    {path: '/', element: <Home />},
    {path: '/login', element: <Auth />},
    {path: '/register', element: <Auth />},
    {path: '/dashboard', element: <Dashboard />},
  ]);

  return (
    <main>
        <RouterProvider router={routes} />
    </main>
  );
}

export default App;
