import avatarUrl from "../../assets/images/1.png";



// AuthorCard 是作者信息卡片组件，负责展示头像、名字、签名和简介。
function AuthorCard() {
  return (
    <div>
      <img
        src={avatarUrl}
        alt="头像"
        className="h-32 w-32 rounded-full object-cover"
      />
    </div>
  );
}

export default AuthorCard;
