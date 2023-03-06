import Image from "next/image";
import Link from "next/link";
import LogoImage from "public/assets/img/logo.jpg";

const Logo: React.FC = () => {
    return (
        <Link href="/" className="w-[40px]">
            <Image src={LogoImage} alt="logo" />
        </Link>
    );
};
export default Logo;
