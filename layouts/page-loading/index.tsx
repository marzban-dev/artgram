import Spinner from "components/spinner";

const PageLoading: React.FC = () => {
    return (
        <div className="w-full h-[100dvh] bg-black flex justify-center items-center">
            <Spinner size={45} />
        </div>
    );
};

export default PageLoading;
