import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useSearchQuery } from "hooks/use-search";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setIsSearching, setSearch } from "store/slice/explore.slice";

const Input: React.FC = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
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

    return (
        <input
            className={inputClasses}
            placeholder="Search something"
            onChange={!isSearching ? onChange : undefined}
            disabled={isSearching}
            value={inputValue}
        />
    );
};

export default Input;
