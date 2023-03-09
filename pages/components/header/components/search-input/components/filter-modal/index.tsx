import Badge from "components/badge";
import Modal from "components/modal";
import SelectMenu from "components/select-menu";
import { useSearchQuery } from "hooks/use-search";
import AscIcon from "public/assets/icon/arrow-down-a-z.svg";
import DesIcon from "public/assets/icon/arrow-up-z-a.svg";
import BrushIcon from "public/assets/icon/brush.svg";
import CalendarIcon from "public/assets/icon/calendar-days.svg";
import CapIcon from "public/assets/icon/graduation-cap.svg";
import LocationIcon from "public/assets/icon/location-dot.svg";
import PaletteIcon from "public/assets/icon/palette.svg";
import ShapesIcon from "public/assets/icon/shapes.svg";
import TitleIcon from "public/assets/icon/text.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setIsSearching, setOrderBy, setSearchBy, TOrderBy, TSearchBy } from "store/slice/explore.slice";
import { IFilterModalProps } from "./filter-modal.types";

const FilterModal: React.FC<IFilterModalProps> = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const { refetch } = useSearchQuery();
    const search = useSelector((state: RootState) => state.explore.search);
    const searchBy = useSelector((state: RootState) => state.explore.searchBy);
    const orderBy = useSelector((state: RootState) => state.explore.orderBy);

    const clearAndRefetch = () => {
        setTimeout(async () => {
            dispatch(setIsSearching(true));
            await refetch();
            dispatch(setIsSearching(false));
        }, 500);
    };

    const onSearchBySelect = (id: TSearchBy) => {
        dispatch(setSearchBy(id));
        if (searchBy !== id && search) clearAndRefetch();
    };

    const onOrderBySelect = (id: TOrderBy) => {
        dispatch(setOrderBy(id));
        if (orderBy !== id && search) clearAndRefetch();
    };

    return (
        <Modal title="Filters" show={show} onClose={() => setShow(false)}>
            <div className="flex w-full flex-col items-start justify-start gap-2">
                <SelectMenu
                    items={[
                        { text: "kir1", value: "kir1" },
                        { text: "kir2", value: "kir2" },
                        { text: "kir3", value: "kir3" },
                    ]}
                />
                <h3 className="pl-3 text-[18px] font-medium text-white">Search By</h3>
                <div className="flex flex-wrap items-center justify-start gap-2">
                    <Badge
                        id="title"
                        onSelect={onSearchBySelect}
                        text="Title"
                        selected={searchBy === "title"}
                        icon={TitleIcon}
                    />
                    <Badge
                        id="type"
                        onSelect={onSearchBySelect}
                        text="Type"
                        selected={searchBy === "type"}
                        icon={PaletteIcon}
                    />
                    <Badge
                        id="date"
                        onSelect={onSearchBySelect}
                        text="Year"
                        selected={searchBy === "date"}
                        icon={CalendarIcon}
                    />
                    <Badge
                        id="technique"
                        onSelect={onSearchBySelect}
                        text="Technique"
                        selected={searchBy === "technique"}
                        icon={BrushIcon}
                    />
                    <Badge
                        id="location"
                        onSelect={onSearchBySelect}
                        text="Location"
                        selected={searchBy === "location"}
                        icon={LocationIcon}
                    />
                    <Badge
                        id="form"
                        onSelect={onSearchBySelect}
                        text="Form"
                        selected={searchBy === "form"}
                        icon={ShapesIcon}
                    />
                    <Badge
                        id="school"
                        onSelect={onSearchBySelect}
                        text="School"
                        selected={searchBy === "school"}
                        icon={CapIcon}
                    />
                </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
                <h3 className="pl-3 text-[18px] font-medium text-white">Order By</h3>
                <div className="flex flex-wrap items-center justify-start gap-2">
                    <Badge
                        id="asc"
                        onSelect={onOrderBySelect}
                        text="Ascending"
                        selected={orderBy === "asc"}
                        icon={AscIcon}
                    />
                    <Badge
                        id="des"
                        onSelect={onOrderBySelect}
                        text="Descending"
                        selected={orderBy === "des"}
                        icon={DesIcon}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default FilterModal;
