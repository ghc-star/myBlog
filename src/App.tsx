import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/layout/LeftSidebar";

function App() {
  return (
    <div className="app-content flex min-h-screen text-[var(--text-main)]">
      <LeftSidebar />
      <Outlet />
    </div>
  );
}

export default App;
