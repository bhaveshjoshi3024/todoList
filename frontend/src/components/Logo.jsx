import Image from "next/image";
import logo from "@/public/next.svg";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src={logo} alt="logo" width={40} height={40} />
      <h1 className="text-2xl font-bold">TODO</h1>
    </div>
  );
}
