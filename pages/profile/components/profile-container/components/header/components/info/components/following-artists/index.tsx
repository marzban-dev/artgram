import { ISimpleArtist } from "apis/arts.types";
import User from "components/user";
import UsersModal from "components/users-modal";
import { useCountQuery } from "hooks/use-count";
import { useFollowingArtistsQuery } from "hooks/use-following-artists";
import { Fragment, useMemo, useState } from "react";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import { IFollowingArtistsProps } from "./following-artists.types";

const FollowingArtists: React.FC<IFollowingArtistsProps> = ({ id, initial }) => {
    const [show, setShow] = useState(false);
    const { data: count } = useCountQuery(["following-artists", id], initial, { id });
    const { data, fetchNextPage, hasNextPage } = useFollowingArtistsQuery(id, show);

    const artists = useMemo(() => {
        return flatInfiniteQueryData<ISimpleArtist>(data!).map((artist) => (
            <User
                id={String(artist.id)}
                avatar={artist.image}
                underTitle={artist.name}
                title={artist.name}
                isFollowing={artist.following}
                type="artist"
                key={artist.id}
            />
        ));
    }, [data]);

    return (
        <Fragment>
            <button
                className="text-[rgb(160,160,160)] font-semibold text-[14px] whitespace-nowrap"
                onClick={() => setShow(true)}
            >
                Artists <span className="text-white"> {count}</span>
            </button>
            {count !== 0 && (
                <UsersModal
                    users={artists}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    setShow={setShow}
                    show={show}
                    title="Artists"
                />
            )}
        </Fragment>
    );
};
export default FollowingArtists;
