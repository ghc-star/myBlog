import ContentArea from "./ContentArea";
import RightSidebar from "./RightSidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-transparent text-[var(--text-main)] lg:pr-[264px]">
      <ContentArea />
      <RightSidebar />
    </div>
  );
}

export default MainLayout;
