import Modal from "components/modal";
import Spinner from "components/spinner";
import UserPlaceholder from "components/user/components/user-placeholder";
import InfiniteScroll from "react-infinite-scroll-component";
import { IUsersModalProps } from "./users-modal.types";

const UsersModal: React.FC<IUsersModalProps> = ({ show, setShow, title, users, fetchNextPage, hasNextPage }) => {
    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <div className="pt-2 pb-5 min-[520px]:py-5 px-6 overflow-y-auto max-h-[500px] scrollbar-custom relative">
                <div className="flex justify-center items-center border-b-2 border-[rgb(40,40,40)] pb-2 mb-6">
                    <span className="text-white font-medium text-[25px]">{title}</span>
                </div>
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
            </div>
        </Modal>
    );
};

export default UsersModal;
