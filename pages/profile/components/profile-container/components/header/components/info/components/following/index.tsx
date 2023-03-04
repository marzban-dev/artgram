import { ISimpleUser } from "api/user.types";
import User from "components/user";
import UsersModal from "components/users-modal";
import { useCountQuery } from "hooks/use-count";
import { useFollowingQuery } from "hooks/use-following";
import { Fragment, useMemo, useState } from "react";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import { IFollowingProps } from "./following.types";

const Following: React.FC<IFollowingProps> = ({ id, type, initial }) => {
    const [show, setShow] = useState(false);
    const { data: count } = useCountQuery(["following", id], initial, { id, type });
    const { data, fetchNextPage, hasNextPage } = useFollowingQuery(id, type, show);

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
                Following <span className="text-white"> {count}</span>
            </button>
            {count !== 0 && (
                <UsersModal
                    users={users}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    setShow={setShow}
                    show={show}
                    title="Following"
                />
            )}
        </Fragment>
    );
};

export default Following;
