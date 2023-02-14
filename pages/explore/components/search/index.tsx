import { Fragment } from "react";
import Background from "./components/background";
import Description from "./components/description";
import FilterModal from "./components/filter-modal";
import SearchInput from "./components/search-input";

const Search: React.FC = () => {
    return (
        <Fragment>
            <div className="w-full h-[65vh] flex justify-center items-center flex-col overflow-hidden relative mb-8">
                <Background />
                <Description />
                <SearchInput />
            </div>
            <FilterModal />
        </Fragment>
    );
};

export default Search;
