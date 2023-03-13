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
        <div
            onClick={makeArtFullScreen}
            className="w-full h-full max-h-[450px] min-[800px]:max-h-[550px] min-h-[350px] z-10 cursor-pointer overflow-hidden relative flex justify-center items-center bg-[rgb(15,15,15)]"
        >
            {!isLoaded && <Placeholder wrapperClassName="absolute z-10" width="100%" height="100%" borderRadius={0}/>}
            <motion.div animate={{ opacity: isLoaded ? 1 : 0 }}>
                <Image
                    id={`art-${id}`}
                    src={picture}
                    alt={title}
                    priority={priority}
                    width={width}
                    height={height}
                    className="brightness-[0.85] transition-[filter] duration-[400ms]"
                    onLoadingComplete={() => setIsLoaded(true)}
                />
            </motion.div>
        </div>
    );
};

export default ArtPicture;
