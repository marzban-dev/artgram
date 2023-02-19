import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useArtistArtsQuery } from "hooks/use-artist-arts";
import React from "react";
import { IArtistArtsProps } from "./artist-arts.types";

const ArtistArts: React.FC<IArtistArtsProps> = ({ id }) => {
    const { data: arts, fetchNextPage, hasNextPage } = useArtistArtsQuery(id);

    return arts?.pages ? (
        <InfiniteArts className="mt-6" arts={arts.pages.flat()} hasNextPage={!!hasNextPage} callback={fetchNextPage} />
    ) : (
        <Spinner size={100} />
    );
};
export default ArtistArts;
