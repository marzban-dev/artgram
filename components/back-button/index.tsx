import { useRouter } from "next/router";
import LeftIcon from "public/assets/icon/chevron-left.svg";

const BackButton: React.FC = () => {
    const router = useRouter();

    const backToPrevRoute = () => router.back();

    return (
        <button onClick={backToPrevRoute}>
            <LeftIcon className="h-[20px] fill-white" />
        </button>
    );
};
export default BackButton;
