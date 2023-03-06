import { INotification } from "api/user.types";
import Modal from "components/modal";
import Notification from "components/notification";
import Spinner from "components/spinner";
import { useNotificationsQuery } from "hooks/use-notifications";
import { useSeenNotificationsMutation } from "hooks/use-seen-notifications";
import { useEffect, useMemo, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import NotificationPlaceholder from "./components/notification-placeholder";
import { INotificationsProps } from "./notifications.types";

const Notifications: React.FC<INotificationsProps> = ({ show, setShow }) => {
    const notificationsContainer = useRef<HTMLDivElement>(null);
    const { data: notifications, fetchNextPage, hasNextPage } = useNotificationsQuery(show);
    const { mutate: seenNotifications } = useSeenNotificationsMutation();

    useEffect(() => {
        if (notifications) seenNotifications({ id: flatInfiniteQueryData<INotification>(notifications)[0].id });
    }, [notifications, seenNotifications]);

    const renderNotifications = useMemo(() => {
        if (notifications) {
            return flatInfiniteQueryData<INotification>(notifications).map((notification) => (
                <Notification
                    id={notification.obj.username}
                    avatar={notification.owner.profile_img}
                    isFollowing={notification.obj.following}
                    username={notification.obj.username}
                    type={notification.type}
                    key={notification.id}
                />
            ));
        }

        return null;
    }, [notifications]);

    return (
        <Modal title="Notifications" show={show} onClose={() => setShow(false)}>
            {!renderNotifications ? (
                <NotificationPlaceholder />
            ) : (
                <InfiniteScroll
                    dataLength={renderNotifications.length}
                    next={fetchNextPage}
                    hasMore={!!hasNextPage}
                    loader={<Spinner size={40} style={{ padding: "50px 0" }} />}
                >
                    <div
                        className="flex justify-start items-center flex-col gap-5 max-[520px]:pb-8"
                        ref={notificationsContainer}
                    >
                        {renderNotifications}
                    </div>
                </InfiniteScroll>
            )}
        </Modal>
    );
};

export default Notifications;
