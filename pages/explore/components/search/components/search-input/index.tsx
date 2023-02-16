import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useSearchQuery } from "hooks/use-search";
import FilterIcon from "public/assets/icon/filter-list.svg";
import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setIsSearching, setSearch } from "store/slice/explore.slice";
import FilterModal from "../filter-modal";

const SearchInput: React.FC = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [showFilters, setShowFilters] = useState(false);
    const { refetch } = useSearchQuery();
    const isSearching = useSelector((state: RootState) => state.explore.isSearching);

    const currentSearchText = useSelector((state: RootState) => state.explore.search);
    const [inputValue, setInputValue] = useState(currentSearchText ? currentSearchText : "");
    const [newSearchText, setNewSearchText] = useState("");
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timer.current) {
            if (newSearchText.length !== 0) {
                dispatch(setSearch(newSearchText));

                setTimeout(async () => {
                    dispatch(setIsSearching(true));
                    await refetch();
                    dispatch(setIsSearching(false));
                }, 500);
            } else {
                queryClient.setQueryData(["search"], null);
                dispatch(setSearch(null));
            }
        }
    }, [newSearchText]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            setNewSearchText(e.target.value);
        }, 500);
    };

    const inputClasses = classNames({
        "outline-none bg-transparent border-none w-full h-full placeholder:text-[rgb(100,100,100)] transition-colors": 1,
        "text-[rgb(100,100,100)]": isSearching,
        "text-white": !isSearching,
    });

    const iconClasses = classNames({
        "h-[22px] fill-[rgb(180,180,180)] transition-colors": 1,
        "fill-[rgb(100,100,100)]": isSearching,
        "fill-[rgb(180,180,180)] group-hover:fill-[rgb(220,220,220)]": !isSearching,
    });

    return (
        <Fragment>
            <div className="w-[450px] h-[55px] bg-[rgb(25,25,25)] border-2 border-[rgb(40,40,40)] rounded-[30px] px-5 z-20 flex justify-start items-center focus-within:border-[rgb(60,60,60)] transition-colors">
                <input
                    className={inputClasses}
                    placeholder="Search something"
                    onChange={!isSearching ? onChange : undefined}
                    value={inputValue}
                    disabled={isSearching}
                />
                <button
                    className="group flex justify-center items-center py-4"
                    onClick={!isSearching ? () => setShowFilters(true) : undefined}
                    disabled={isSearching}
                    title="Open filters"
                >
                    <FilterIcon className={iconClasses} />
                </button>
            </div>
            <FilterModal show={showFilters} setShow={setShowFilters} />
        </Fragment>
    );
};
export default SearchInput;
