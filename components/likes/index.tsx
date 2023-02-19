import { IArtLike } from "api/arts.types";
import Modal from "components/modal";
import Spinner from "components/spinner";
import User from "components/user";
import { useArtLikesQuery } from "hooks/use-art-likes";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import UserPlaceholder from "./components/user-placeholder";
import { ILikesProps } from "./likes.types";

const Likes: React.FC<ILikesProps> = ({ show, setShow, id, initialData }) => {
    const { data, fetchNextPage, hasNextPage } = useArtLikesQuery(id, initialData);

    const renderUsers = useMemo(() => {
        return flatInfiniteQueryData<IArtLike>(data!).map((like) => (
            <User
                avatar={like.owner.profile_img}
                firstName={like.owner.username}
                username={like.owner.username}
                key={like.id}
            />
        ));
    }, [data]);

    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <div className="pt-2 pb-5 min-[520px]:py-5 px-6 overflow-y-scroll max-h-[500px] scrollbar-custom relative">
                <div className="flex justify-center items-center border-b-2 border-[rgb(40,40,40)] pb-2 mb-6">
                    <span className="text-white font-medium text-[25px]">Likes</span>
                </div>
                {renderUsers.length === 0 ? (
                    <UserPlaceholder />
                ) : (
                    <InfiniteScroll
                        dataLength={renderUsers.length}
                        next={fetchNextPage}
                        hasMore={!!hasNextPage}
                        loader={<Spinner size={40} style={{ padding: "50px 0" }} />}
                    >
                        <div className="flex justify-start items-center flex-col gap-5 max-[520px]:pb-8">
                            {renderUsers}
                        </div>
                    </InfiniteScroll>
                )}
            </div>
        </Modal>
    );
};

export default Likes;
