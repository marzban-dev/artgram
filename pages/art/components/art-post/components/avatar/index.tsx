import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IAvatarProps } from "./avatar.types";

const Avatar: React.FC<IAvatarProps> = ({ title }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [picture, setPicture] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get<string>("/api/artist-picture", {
                params: {
                    q: `${title} artist wikipedia picture`,
                },
            })
            .then((res) => {
                setPicture(res.data);
            });
    }, []);

    return (
        <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full text-white overflow-hidden relative shadow-lg">
            {picture && (
                <Image
                    src={picture}
                    alt={title}
                    style={{ objectFit: "cover" }}
                    onLoadingComplete={() => setIsLoaded(true)}
                    fill
                />
            )}

            {!picture && !isLoaded && (
                <div className="absolute z-[20] top-0 w-full h-full rounded-full flex justify-center items-center">
                    {title[0]}
                </div>
            )}
        </div>
    );
};

export default Avatar;
