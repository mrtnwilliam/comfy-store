import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";

function Logo() {
  return (
      <Link href="/">
        <Image src={logo} alt="logo" className="w-full h-11 object-cover" />
        {/* <VscCode className='w-6 h-6' /> */}
      </Link>
  )
}

export default Logo