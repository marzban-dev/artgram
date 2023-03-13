import Background from "./components/background";
import Description from "./components/description";
import SearchInput from "./components/search-input";

const Header: React.FC = () => {
    return (
        <div className="w-full h-[380px] min-[600px]:h-[450px] flex justify-center items-center flex-col overflow-hidden relative mb-8">
            <Background />
            <Description />
            <SearchInput />
        </div>
    );
};

export default Header;
