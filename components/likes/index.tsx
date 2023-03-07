import { IArtLike } from "apis/arts.types";
import User from "components/user";
import UsersModal from "components/users-modal";
import { useArtLikesQuery } from "hooks/use-art-likes";
import { useMemo } from "react";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import { ILikesProps } from "./likes.types";

const Likes: React.FC<ILikesProps> = ({ show, setShow, id }) => {
    const { data, fetchNextPage, hasNextPage } = useArtLikesQuery(id, show);

    const users = useMemo(() => {
        return flatInfiniteQueryData<IArtLike>(data!).map((like) => (
            <User
                id={like.owner.username}
                avatar={like.owner.profile_img}
                title={like.owner.username}
                underTitle={like.owner.username}
                isFollowing={like.owner.following}
                type="user"
                key={like.id}
            />
        ));
    }, [data]);

    return (
        <UsersModal
            users={users}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            setShow={setShow}
            show={show}
            title="Likes"
        />
    );
};

export default Likes;
