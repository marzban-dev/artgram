import { AnimatePresence, motion } from "framer-motion";
import BrushIcon from "public/assets/icon/brush.svg";
import CapIcon from "public/assets/icon/graduation-cap.svg";
import InfoIcon from "public/assets/icon/info.svg";
import LocationIcon from "public/assets/icon/location-dot.svg";
import PaletteIcon from "public/assets/icon/palette.svg";
import ShapesIcon from "public/assets/icon/shapes.svg";
import { Fragment, useMemo, useState } from "react";
import { IArtDetailProps } from "./art-detail.types";
import Detail from "./components/detail";

const ArtDetail: React.FC<IArtDetailProps> = ({ id, form, location, school, technique, type }) => {
    const [show, setShow] = useState(false);

    const onMouseEnterInfoIcon = () => {
        const artPictureContainer = document.querySelector(`#art-${id}`) as HTMLDivElement;
        artPictureContainer.style.filter = "brightness(0.4)";
        setShow(true);
    };

    const onMouseLeaveDetailLayer = () => {
        const artPictureContainer = document.querySelector(`#art-${id}`) as HTMLDivElement;
        artPictureContainer.style.filter = "brightness(0.85)";
        setShow(false);
    };

    const renderInfos = useMemo(() => {
        const infos = [
            { icon: ShapesIcon, text: form, title: "form" },
            { icon: LocationIcon, text: location, title: "location" },
            { icon: CapIcon, text: school, title: "school" },
            { icon: BrushIcon, text: technique, title: "technique" },
            { icon: PaletteIcon, text: type, title: "type" },
        ];

        return infos.map((detail) => <Detail key={detail.title} {...detail} />);
    }, []);

    return (
        <Fragment>
            <div className="flex justify-center items-center absolute z-20 bottom-[16px] left-[18px]">
                <div
                    className="shadow-lg shadow-[rgba(0,0,0,0.5)] rounded-full"
                    onMouseEnter={onMouseEnterInfoIcon}
                    data-testid="art-detail-container"
                >
                    <div className="w-[30px] h-[30px] bg-[rgba(35,35,35,1)] rounded-full flex justify-center items-center z-20 relative">
                        <InfoIcon className="fill-[rgba(200,200,200,1)] h-[15px]" />
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {show && (
                    <motion.div
                        className="w-full h-full absolute top-0 z-10 text-[18px] flex justify-center items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onMouseLeave={onMouseLeaveDetailLayer}
                        data-testid="art-detail-text"
                    >
                        <div
                            className="max-w-[340px] min-[460px]:max-w-[400px] w-full bg-[rgb(20,20,20)] p-4 min-[460px]:p-5 rounded-[20px] flex justify-center items-start flex-col gap-2"
                            onMouseLeave={onMouseLeaveDetailLayer}
                        >
                            {renderInfos}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default ArtDetail;
