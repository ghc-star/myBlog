import ContentArea from "./ContentArea";
import RightSidebar from "./RightSidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-transparent pr-[264px] text-[var(--text-main)]">
      <ContentArea />
      <RightSidebar />
    </div>
  );
}

export default MainLayout;
