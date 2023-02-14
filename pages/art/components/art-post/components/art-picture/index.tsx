import Placeholder from "components/placeholder";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFullscreenArt } from "store/slice/app.slice";
import { IArtPictureProps } from "./art-picture.types";

const ArtPicture: React.FC<IArtPictureProps> = ({ id, picture, title, width, height, priority }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const makeArtFullScreen = () => {
        dispatch(setFullscreenArt({ id, title, picture, width, height }));
    };

    return (
        <div onClick={makeArtFullScreen} className="w-full relative aspect-square z-10 cursor-pointer">
            {!isLoaded && <Placeholder width="100%" height="100%" />}
            <motion.div animate={{ opacity: isLoaded ? 1 : 0 }}>
                <Image
                    id={`art-${id}`}
                    src={picture}
                    alt={title}
                    style={{ objectFit: "cover" }}
                    priority={priority}
                    quality={50}
                    className="brightness-[0.85] transition-[filter] duration-[400ms]"
                    onLoadingComplete={() => setIsLoaded(true)}
                    fill
                />
            </motion.div>
        </div>
    );
};

export default ArtPicture;
