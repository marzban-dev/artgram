import Spinner from "components/spinner";
import { motion } from "framer-motion";

const PageLoading: React.FC = () => {
    return (
        <motion.div
            className="w-full h-screen bg-black flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Spinner size={45} />
        </motion.div>
    );
};

export default PageLoading;
