import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { IPlaceholderProps } from "./placeholder.types";

const Placeholder: React.FC<IPlaceholderProps> = ({ wrapperClassName = "", width, height, ...props }) => {
    const wrapperStyle: React.CSSProperties = {
        width,
        height,
    };

    return (
        <motion.div
            style={wrapperStyle}
            className={wrapperClassName + " placeholder-container"}
            initial={false}
            exit={{ opacity: 0 }}
            data-testid="loading-overlay"
        >
            <Skeleton width={width} height={height} {...props} />
        </motion.div>
    );
};

export default Placeholder;
