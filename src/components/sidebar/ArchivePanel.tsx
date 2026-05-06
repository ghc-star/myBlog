import { useState } from "react";
import blueImage from "@/assets/images/blue.jpg";
import redImage from "@/assets/images/1.png";

function ArchivePanel() {
  const [hover, setHover] = useState(false);

  return (
    <section className="my-10 flex justify-center">
      <div
        className="relative w-[400px] h-[200px] rounded-xl shadow-xl overflow-hidden cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            hover ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${blueImage})` }}
        />

        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${redImage})` }}
        />

        <div className="relative z-10 flex h-full items-center justify-center text-white text-xl font-bold">
          Archive Panel
        </div>
      </div>
    </section>
  );
}

export default ArchivePanel;
