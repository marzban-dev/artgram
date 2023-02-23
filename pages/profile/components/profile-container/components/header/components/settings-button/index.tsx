import GearIcon from "public/assets/icon/gear.svg";
import { Fragment } from "react";

const SettingsButton: React.FC = () => {
    return (
        <Fragment>
            <GearIcon className="fill-[rgb(200,200,200)] h-[20px]" />
        </Fragment>
    );
};

export default SettingsButton;
