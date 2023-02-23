import { ISavedArt } from "api/user.types";
import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useSavedArtsQuery } from "hooks/use-saved-arts";
import React, { useMemo } from "react";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import { IUserArtsProps } from "./user-arts.types";

const UserArts: React.FC<IUserArtsProps> = ({ id }) => {
    const { data: savedArts, fetchNextPage, hasNextPage } = useSavedArtsQuery(id);

    const arts = useMemo(() => {
        if (savedArts) {
            return flatInfiniteQueryData<ISavedArt>(savedArts).map((savedArt) => savedArt.art);
        }

        return null;
    }, [savedArts]);

    return arts ? (
        <InfiniteArts className="mt-6" arts={arts} hasNextPage={!!hasNextPage} callback={fetchNextPage} />
    ) : (
        <Spinner size={100} />
    );
};
export default UserArts;
