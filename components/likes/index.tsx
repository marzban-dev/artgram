import Modal from "components/modal";
import User from "components/user";
import { useArtLikesQuery } from "hooks/use-art-likes";
import { useMemo } from "react";
import UserPlaceholder from "./components/user-placeholder";
import { ILikesProps } from "./likes.types";

const Likes: React.FC<ILikesProps> = ({ show, setShow, id, initialData }) => {
    const { data } = useArtLikesQuery(id, initialData);

    const renderUsers = useMemo(() => {
        return data.users.map((like) => (
            <User
                avatar={like.owner.profile_img}
                firstName={like.owner.username}
                username={like.owner.username}
                key={like.id}
            />
        ));
    }, [data]);

    const onModalClose = () => {
        console.log("close modal");
        setShow(false);
    };

    return (
        <Modal show={show} onClose={onModalClose}>
            <div className="pt-2 pb-5 min-[520px]:py-5 px-6 overflow-y-scroll max-h-[500px] scrollbar-custom relative">
                <div className="flex justify-center items-center border-b-2 border-[rgb(40,40,40)] pb-2 mb-6">
                    <span className="text-white font-medium text-[25px]">Likes</span>
                </div>
                {data.users.length === 0 ? (
                    <UserPlaceholder />
                ) : (
                    <div className="flex justify-start items-center flex-col gap-5 max-[520px]:pb-8">{renderUsers}</div>
                )}
            </div>
        </Modal>
    );
};

export default Likes;
