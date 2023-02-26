import { ISimpleUser } from "api/user.types";
import User from "components/user";
import UsersModal from "components/users-modal";
import { useFollowersQuery } from "hooks/use-followers";
import { Fragment, useMemo, useState } from "react";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import { IFollowersProps } from "./followers.types";

const Followers: React.FC<IFollowersProps> = ({ id, type, initial }) => {
    const [show, setShow] = useState(false);
    const { data, fetchNextPage, hasNextPage } = useFollowersQuery(id, type, initial);
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
                Followers <span className="text-white"> {count}</span>
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
export default Followers;
