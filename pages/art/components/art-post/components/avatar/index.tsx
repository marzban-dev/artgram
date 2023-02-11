import axios from "axios";
import AvatarComponent from "components/avatar";
import { useEffect, useState } from "react";
import { IAvatarProps } from "./avatar.types";

const Avatar: React.FC<IAvatarProps> = ({ title }) => {
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

    return <AvatarComponent width={60} height={60} picture={picture} title={title} />;
};

export default Avatar;
