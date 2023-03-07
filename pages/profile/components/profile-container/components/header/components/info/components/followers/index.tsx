import { ISimpleUser } from "apis/user.types";
import User from "components/user";
import UsersModal from "components/users-modal";
import { useCountQuery } from "hooks/use-count";
import { useFollowersQuery } from "hooks/use-followers";
import { Fragment, useMemo, useState } from "react";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import { IFollowersProps } from "./followers.types";

const Followers: React.FC<IFollowersProps> = ({ id, type, initial }) => {
    const [show, setShow] = useState(false);
    const { data: count } = useCountQuery(["followers", type === "artist" ? Number(id) : id], initial, { id, type });
    const { data, fetchNextPage, hasNextPage } = useFollowersQuery(id, type, show);

    const users = useMemo(() => {
        return flatInfiniteQueryData<ISimpleUser>(data!).map((user) => (
            <User
                id={user.username}
                avatar={user.profile_img}
                underTitle={user.username}
                title={user.username}
                isFollowing={user.following}
                type="user"
                key={user.username}
            />
        ));
    }, [data]);

    return (
        <Fragment>
            <button
                className="text-[rgb(160,160,160)] font-semibold text-[14px] whitespace-nowrap"
                onClick={() => setShow(true)}
            >
                Followers <span className="text-white"> {count}</span>
            </button>
            {count !== 0 && (
                <UsersModal
                    users={users}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    setShow={setShow}
                    show={show}
                    title="Followers"
                />
            )}
        </Fragment>
    );
};
export default Followers;
