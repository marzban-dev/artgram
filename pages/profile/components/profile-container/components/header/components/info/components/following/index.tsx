import { ISimpleUser } from "api/user.types";
import User from "components/user";
import UsersModal from "components/users-modal";
import { useFollowingQuery } from "hooks/use-following";
import { Fragment, useMemo, useState } from "react";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import { IFollowingProps } from "./following.types";

const Following: React.FC<IFollowingProps> = ({ id, type, initial }) => {
    const [show, setShow] = useState(false);
    const { data, fetchNextPage, hasNextPage } = useFollowingQuery(id, type, initial);
    const count = data!.pages.at(-1)!.count;

    const users = useMemo(() => {
        return flatInfiniteQueryData<ISimpleUser>(data!).map((user) => (
            <User
                avatar={user.profile_img}
                firstName={user.username}
                username={user.username}
                isFollowing={user.following}
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
