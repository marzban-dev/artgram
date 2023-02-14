import classNames from "classnames";
import { IBadgeProps } from "./badge.types";

const Badge: React.FC<IBadgeProps> = ({ id, onSelect, selected, text, icon: Icon, iconSize = 18 }) => {
    const containerClasses = classNames({
        "bg-[rgb(30,30,30)] rounded-[15px] border-2 px-3 py-1 transition-colors cursor-pointer flex justify-center gap-2": 1,
        "border-[rgb(40,40,40)]": !selected,
        "border-[rgb(150,150,150)]": selected,
    });

    const textClasses = classNames({
        "font-semibold transition-colors": 1,
        "text-[rgb(100,100,100)]": !selected,
        "text-[rgb(140,140,140)]": selected,
    });

    const iconClasses = classNames({
        "fill-[rgb(130,130,130)]": !selected,
        "fill-[rgb(180,180,180)]": selected,
    });

    return (
        <div className={containerClasses} onClick={() => onSelect(id)}>
            <div className="flex justify-center items-center">
                {Icon && <Icon className={iconClasses} style={{ height: iconSize }} />}
            </div>
            <span className={textClasses}>{text}</span>
        </div>
    );
};

export default Badge;
