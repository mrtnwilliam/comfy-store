import { currentUser } from "@clerk/nextjs/server"
import { LuUserRound } from "react-icons/lu";

async function UserIcon() {

  const user = await currentUser();
  const profileImage = user?.imageUrl;

  if (profileImage) {
    return <img src={profileImage} className="w-6 h-6 rounded-full object-cover" />
  }

  return (
    <LuUserRound className="w-10 h-10 bg-primary rounded-full text-white"/>
  )
}

export default UserIcon