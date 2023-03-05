import { ISavedArt } from "api/arts.types";
import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useSavedArtsQuery } from "hooks/use-saved-arts";
import React, { memo, useMemo } from "react";
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
        <InfiniteArts
            className="min-[661px]:mt-6 max-[660px]:px-3 max-[660px]:pb-6"
            arts={arts}
            hasNextPage={!!hasNextPage}
            callback={fetchNextPage}
        />
    ) : (
        <Spinner style={{ padding: "80px 0" }} size={40} />
    );
};
export default memo(UserArts);
