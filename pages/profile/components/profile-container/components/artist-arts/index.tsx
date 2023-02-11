import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useArtistArtsQuery } from "hooks/use-artist-arts";
import React from "react";
import { IArtistArtsProps } from "./artist-arts.types";

const ArtistArts: React.FC<IArtistArtsProps> = ({ id, count }) => {
    const { data: arts, fetchNextPage } = useArtistArtsQuery(id);

    return arts?.pages ? (
        <InfiniteArts
            arts={arts.pages.flat()}
            count={count}
            callback={fetchNextPage}
        />
    ) : (
        <Spinner size={100} />
    );
};
export default ArtistArts;
