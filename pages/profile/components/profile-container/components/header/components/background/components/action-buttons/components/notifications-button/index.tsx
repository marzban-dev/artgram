import Notifications from "components/notifications";
import BellIcon from "public/assets/icon/bell.svg";
import React, { Fragment, useState } from "react";
import ActionButton from "../action-button";

const NotificationsButton: React.FC = () => {
    const [showNotifications, setShowNotifications] = useState(false);

    const openNotifications = () => {
        setShowNotifications(true);
    };

    return (
        <Fragment>
            <Notifications show={showNotifications} setShow={() => setShowNotifications(false)} />
            <ActionButton action={openNotifications} icon={BellIcon} />
        </Fragment>
    );
};
export default NotificationsButton;
