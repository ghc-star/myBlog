import { createRoot } from "react-dom/client";
import "./index.css";

import { router } from "./router/index.tsx";
import { RouterProvider } from "react-router-dom";
import ParticlesBackground from "./components/background/ParticlesBackground.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <ParticlesBackground />
    <RouterProvider router={router}></RouterProvider>
  </>,
);
