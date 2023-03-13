import classNames from "classnames";
import FilterIcon from "public/assets/icon/filter-list.svg";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import FilterModal from "../filter-modal";

const FilterButton: React.FC = () => {
    const [showFilters, setShowFilters] = useState(false);
    const isSearching = useSelector((state: RootState) => state.explore.isSearching);

    const iconClasses = classNames({
        "h-[22px] fill-[rgb(180,180,180)] transition-colors fill-[rgb(180,180,180)] group-hover:fill-[rgb(220,220,220)]": 1,
        // "fill-[rgb(100,100,100)]": isSearching,
        // "fill-[rgb(180,180,180)] group-hover:fill-[rgb(220,220,220)]": !isSearching,
    });

    return (
        <Fragment>
            <button
                className="group flex justify-center items-center py-4"
                onClick={() => setShowFilters(true)}
                title="Open filters"
            >
                <FilterIcon className={iconClasses} />
            </button>
            <FilterModal show={showFilters} setShow={setShowFilters} />
        </Fragment>
    );
};

export default FilterButton;
