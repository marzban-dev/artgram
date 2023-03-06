import Modal from "components/modal";
import Spinner from "components/spinner";
import UserPlaceholder from "components/user/components/user-placeholder";
import InfiniteScroll from "react-infinite-scroll-component";
import { IUsersModalProps } from "./users-modal.types";

const UsersModal: React.FC<IUsersModalProps> = ({ show, setShow, title, users, fetchNextPage, hasNextPage }) => {
    return (
        <Modal title={title} show={show} onClose={() => setShow(false)}>
            {users.length === 0 ? (
                <UserPlaceholder />
            ) : (
                <InfiniteScroll
                    dataLength={users.length}
                    next={fetchNextPage}
                    hasMore={!!hasNextPage}
                    loader={<Spinner size={40} style={{ padding: "50px 0" }} />}
                >
                    <div className="flex justify-start items-center flex-col gap-5 max-[520px]:pb-8">{users}</div>
                </InfiniteScroll>
            )}
        </Modal>
    );
};

export default UsersModal;
