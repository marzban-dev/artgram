import Logo from "components/logo";
import AppNavbar from "components/navbar";
import PagePadding from "layouts/page-padding";

const Navbar: React.FC = () => {
    return (
        <div className="w-full h-[80px]">
            <PagePadding>
                <div className="w-full h-full flex justify-between items-center gap-8 max-[550px]:px-3]">
                    <Logo />
                    <AppNavbar />
                </div>
            </PagePadding>
        </div>
    );
};

export default Navbar;
