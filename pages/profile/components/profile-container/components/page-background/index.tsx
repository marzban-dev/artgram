import Image from "next/image";
import React from "react";
import { IPageBackgroundProps } from "./page-background.types";
import UserBackground from "public/assets/img/arts/21.jpg";

const PageBackground: React.FC<IPageBackgroundProps> = ({ background }) => {
    return (
        <div className="fixed w-full h-screen z-10 top-0 brightness-[0.08]">
            <Image
                src={background ? background : UserBackground}
                style={{ objectFit: "cover" }}
                alt="background"
                fill
            />
        </div>
    );
};
export default PageBackground;
