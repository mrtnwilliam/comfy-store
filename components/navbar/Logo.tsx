import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="block w-[150px]">
      <Image
        src={logo}
        alt="logo"
        className="w-full h-auto object-contain"
        priority
      />
      {/* <VscCode className='w-6 h-6' /> */}
    </Link>
  );
}

export default Logo;
