import Image from "next/image";
import { useDispatch } from "react-redux";
import { setFullscreenArt } from "store/slice/app.slice";
import { IArtPictureProps } from "./art-picture.types";
import SampleArt from "public/assets/img/arts/16.jpg";
import { useEffect, useState } from "react";
import Spinner from "components/spinner";
import { AnimatePresence, motion } from "framer-motion";

const ArtPicture: React.FC<IArtPictureProps> = ({ id, picture, title, priority }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 4000);
    }, []);

    const makeArtFullScreen = () => {
        dispatch(setFullscreenArt({ id, title, picture }));
    };

    return (
        <div onClick={makeArtFullScreen} className="w-full relative aspect-square z-10 cursor-pointer">
            <AnimatePresence>
                <div className="w-full h-full flex justify-center items-center absolute bg-[rgb(15,15,15)]">
                    {!isLoaded && <Spinner size={50} />}
                </div>
            </AnimatePresence>
            <motion.div animate={{ opacity: isLoaded ? 1 : 0 }}>
                <Image
                    id={`art-${id}`}
                    src={SampleArt}
                    alt={title}
                    style={{ objectFit: "cover" }}
                    priority={priority}
                    quality={50}
                    className="brightness-[0.85] transition-[filter] duration-[400ms]"
                    fill
                />
            </motion.div>
        </div>
    );
};

export default ArtPicture;
