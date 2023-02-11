import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArtistProfile } from "api/user.api";
import { IGetArtistProfileResponse } from "api/user.types";
import { useArtistQuery } from "hooks/use-artist";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import CalenderIcon from "public/assets/icon/calendar-star.svg";
import { useMemo } from "react";
import ProfileContainer from "../components/profile-container";
import { IProfileInfoProps } from "../components/profile-container/components/header/components/profile-info/profile-info.types";

const ArtistPage: NextPage = () => {
    const { query } = useRouter();
    const { data: artistData } = useArtistQuery(String(query.id));

    const profileInfo = useMemo(() => {
        const info: IProfileInfoProps[] = [];

        info.push({ icon: CalenderIcon, text: "Wikipedia", link: artistData!.wikipedia });
        if (artistData?.age) info.push({ icon: CalenderIcon, text: artistData.age });
        if (artistData?.artnet) info.push({ icon: CalenderIcon, text: "Artnet", link: artistData.artnet });
        if (artistData?.googlearts) info.push({ icon: CalenderIcon, text: "Google", link: artistData.googlearts });

        return info;
    }, [artistData]);

    return (
        <ProfileContainer
            name={artistData!.name}
            avatar={artistData!.avatar}
            description={artistData?.description}
            background={artistData?.background}
            artsCount={artistData!.artsCount}
            profileInfo={profileInfo}
            type="artist"
        />
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        fallback: "blocking",
        paths: [],
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const queryClient = new QueryClient();

    const artistId = String(context.params!.id);

    try {
        // const artistProfile = await getArtistProfile({ id: artistId });
        const artistProfile: IGetArtistProfileResponse = {
            id: "721",
            artsCount: 27,
            name: "Jan de Bray",
            wikipedia: "Jan de Bray",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeOA-djNbmnGsD56k2r4nKnLpLnEBsMN6TS-mWatjO3bFIQbnVnkjSBjr-n2A&s",
            background:
                "https://lh3.googleusercontent.com/ci/AEwo86c2wa6i0WaNp2EK8dzzOKhUg3xmguEhJ68jKicR8OlckrwNcqtOBrIEt6LQtxGpN8-nRgXXDQ",
            age: "1627 - Apr 1, 1697",
            description:
                "Jan de Bray, was a Dutch Golden Age painter. He lived and worked in Haarlem until the age of 60, when he went bankrupt and moved to Amsterdam.<br>Jan de Bray was influenced by his father Salomon de Bray, and the portraitists Bartholomeus van der Helst, and Frans Hals. De Bray's works are mainly portraits, often of groups, and history paintings. He specialised in combining the two genres in the portrait historié, portraits of historical figures using contemporary figures, including himself and his family. Among his finest works are two versions of the Banquet of Cleopatra, using his own family, including himself, as models. The second version has great pathos, as most of those depicted had died in the plague of 1663–4.",
            googlearts: "https://artsandculture.google.com/entity/jan-de-bray/m09pmd3?categoryId=artist",
        };

        await queryClient.prefetchQuery(["artist", artistId], () => artistProfile);
    } catch (e) {
        return {
            notFound: true,
        };
    }

    return {
        revalidate: 60,
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};

export default ArtistPage;
