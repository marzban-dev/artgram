import Image from "next/image";
import LogoImage from "public/assets/img/logo.jpg";

const Logo: React.FC = () => {
    return (
        <div className="w-[40px]">
            <Image src={LogoImage} alt="logo" />
        </div>
    );
};
export default Logo;
