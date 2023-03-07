import { IArt } from "apis/arts.types";
import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useArtistArtsQuery } from "hooks/use-artist-arts";
import React, { memo } from "react";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import { IArtistArtsProps } from "./artist-arts.types";

const ArtistArts: React.FC<IArtistArtsProps> = ({ id }) => {
    const { data: arts, fetchNextPage, hasNextPage } = useArtistArtsQuery(id);

    return arts?.pages ? (
        <InfiniteArts
            className="min-[661px]:mt-6 max-[660px]:px-3 max-[660px]:pb-6"
            arts={flatInfiniteQueryData<IArt>(arts)}
            hasNextPage={!!hasNextPage}
            callback={fetchNextPage}
        />
    ) : (
        <Spinner style={{ padding: "80px 0" }} size={40} />
    );
};
export default memo(ArtistArts);
