import InfiniteArts from "components/infinite-arts";
import { useArtistArtsQuery } from "hooks/use-artist-arts";
import React from "react";
import { IUserArtsProps } from "./user-arts.types";

const UserArts: React.FC<IUserArtsProps> = ({ id, count }) => {
    const { data: arts, fetchNextPage } = useArtistArtsQuery(id);

    return <InfiniteArts arts={arts!.pages.flat()} count={count} callback={fetchNextPage} />;
};
export default UserArts;
