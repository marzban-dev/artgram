import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useSavedArtsQuery } from "hooks/use-saved-arts";
import React, { useMemo } from "react";
import { IUserArtsProps } from "./user-arts.types";

const UserArts: React.FC<IUserArtsProps> = ({ id }) => {
    const { data: savedArts, fetchNextPage, hasNextPage } = useSavedArtsQuery(id);

    const arts = useMemo(() => {
        return savedArts?.pages.flat().map((savedArt) => savedArt.art);
    }, [savedArts]);

    return arts ? (
        <InfiniteArts className="mt-6" arts={arts} hasNextPage={!!hasNextPage} callback={fetchNextPage} />
    ) : (
        <Spinner size={100} />
    );
};
export default UserArts;
