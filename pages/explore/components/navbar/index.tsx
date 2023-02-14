import PagePadding from "layouts/page-padding";
import Image from "next/image";
import Logo from "public/assets/img/logo.jpg";

const Navbar: React.FC = () => {
    return (
        <nav className="w-full h-[80px]">
            <PagePadding>
                <div className="w-full h-full flex justify-between items-center gap-8">
                    <div className="w-[40px]">
                        <Image src={Logo} alt="logo" />
                    </div>
                    <ul className="flex justify-start items-center gap-8">
                        <li className="text-white">Explore</li>
                        <li className="text-white">Request Artist</li>
                        <li className="text-white">About</li>
                    </ul>
                </div>
            </PagePadding>
        </nav>
    );
};

export default Navbar;
