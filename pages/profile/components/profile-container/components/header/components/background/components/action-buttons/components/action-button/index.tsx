import { IActionButtonProps } from "./action-button.types";

const ActionButton: React.FC<IActionButtonProps> = ({ action, attention, icon: Icon }) => {
    return (
        <button onClick={action} className="relative">
            {attention && <div className="absolute top-0 right-[-14px] w-[6px] h-[6px] rounded-full bg-red-500 z-10" />}
            <Icon className="fill-[rgb(200,200,200)] h-[20px]" />
        </button>
    );
};

export default ActionButton;
