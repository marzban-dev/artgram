import { useRouter } from "next/router";
import LeftIcon from "public/assets/icon/chevron-left.svg";

const BackButton: React.FC = () => {
    const router = useRouter();

    const backToPrevRoute = () => router.back();

    return (
        <button onClick={backToPrevRoute}>
            <LeftIcon className="fill-white h-[20px]" />
        </button>
    );
};
export default BackButton;
