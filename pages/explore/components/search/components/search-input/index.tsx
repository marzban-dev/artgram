import { useQueryClient } from "@tanstack/react-query";
import { useSearch } from "hooks/use-search";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "store/slice/explore.slice";
import MagnifyGlassIcon from "public/assets/icon/magnifying-glass.svg";
import FilterIcon from "public/assets/icon/filter-list.svg";

const SearchInput: React.FC = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { refetch } = useSearch();

    const [searchText, setSearchText] = useState("");
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timer.current) {
            queryClient.setQueryData(["search"], null);

            if (searchText.length !== 0) {
                dispatch(setSearch(searchText));

                setTimeout(() => refetch(), 500);
            } else {
                dispatch(setSearch(null));
            }
        }
    }, [searchText]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setSearchText(e.target.value);
        }, 500);
    };

    return (
        <div className="w-[450px] h-[55px] bg-[rgb(25,25,25)] border-2 border-[rgb(40,40,40)] rounded-[30px] px-5 z-20 flex justify-start items-center focus-within:border-[rgb(60,60,60)] transition-colors">
            <input
                className="text-white outline-none bg-transparent border-none w-full h-full placeholder:text-[rgb(100,100,100)]"
                placeholder="Search something"
                onChange={onChange}
            />
            <button className="group flex justify-center items-center py-4" title="Open filters">
                <FilterIcon className="h-[22px] fill-[rgb(180,180,180)] group-hover:fill-[rgb(220,220,220)] transition-colors" />
            </button>
        </div>
    );
};
export default SearchInput;
