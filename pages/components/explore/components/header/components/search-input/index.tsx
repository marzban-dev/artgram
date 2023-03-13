import Spinner from "components/spinner";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import FilterButton from "./components/filter-button";
import Input from "./components/input";

const SearchInput: React.FC = () => {
    const isSearching = useSelector((state: RootState) => state.explore.isSearching);

    return (
        <Fragment>
            <div className="z-20 flex h-[55px] w-[330px] items-center justify-start rounded-[30px] border-2 border-[rgb(40,40,40)] bg-[rgb(25,25,25)] px-5 transition-colors focus-within:border-[rgb(60,60,60)] min-[600px]:w-[450px]">
                <Input />
                {isSearching && <Spinner style={{ padding: "0 15px" }} size={22} />}
                <FilterButton />
            </div>
        </Fragment>
    );
};
export default SearchInput;
