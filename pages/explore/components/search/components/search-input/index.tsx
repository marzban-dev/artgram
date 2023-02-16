import React, { Fragment } from "react";
import FilterButton from "./components/filter-button";
import Input from "./components/input";

const SearchInput: React.FC = () => {
    return (
        <Fragment>
            <div className="w-[450px] h-[55px] bg-[rgb(25,25,25)] border-2 border-[rgb(40,40,40)] rounded-[30px] px-5 z-20 flex justify-start items-center focus-within:border-[rgb(60,60,60)] transition-colors">
                <Input />
                <FilterButton />
            </div>
        </Fragment>
    );
};
export default SearchInput;
