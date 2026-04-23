import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/layout/LeftSidebar";

function App() {
  return (
    <div className="app-content flex min-h-screen text-slate-900">
      <LeftSidebar></LeftSidebar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
