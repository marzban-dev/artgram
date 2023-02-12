import { dehydrate, QueryClient } from "@tanstack/react-query";
import { IGetArtistProfileResponse } from "api/user.types";
import { useArtistQuery } from "hooks/use-artist";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import CalenderIcon from "public/assets/icon/calendar-star.svg";
import { useMemo } from "react";
import ProfileContainer from "../components/profile-container";

const ArtistPage: NextPage = () => {
    const { query } = useRouter();
    const { data: artistData } = useArtistQuery(String(query.id));

    const profileInfo = useMemo(() => {
        return [
            { icon: CalenderIcon, text: artistData!.school },
            { icon: CalenderIcon, text: artistData!.birth_data },
            { icon: CalenderIcon, text: artistData!.profession },
        ];
    }, [artistData]);

    return (
        <ProfileContainer
            name={artistData!.name}
            avatar={artistData!.image}
            description={artistData?.bio}
            background={undefined}
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
            id: 721,
            name: "BREGNO, Lorenzo",
            birth_data: "(b. ca. 1480, Verona, d. 1525, Venezia)",
            profession: "sculptor",
            school: "Italian",
            bio: "Italian sculptor and architect, part of family of sculptors and architects, younger brother of Giovanni Battista Bregno.\r\nHis career began in Treviso, in the workshop of Giovanni Battista. The first documentary information about him dates from 1506, when he was paid for an unidentified work for the chapel of the Holy Sacrament in Treviso Cathedral, where his brother had been working since 1504. Work began in 1507 on the urn of SS Theonestus, Tabra and Tabrata on the high altar of Treviso Cathedral. This sculpture had been commissioned in 1485 from Pietro Lombardo, but according to research it may be the earliest surviving work by Bregno. There is documentation, however, for Bregno's authorship of the Four Evangelists (1511-12) and the St Paul (1513) in the chapel of the Holy Sacrament. In these works, as indeed in the urn, there are clear references to the sculpture of Antonio Lombardo and Pietro Lombardo.\r\nOther works of the period include the damaged altar of the Holy Sepulchre (not later than 1511) in the church of San Martino in Venice. In 1512 the artist produced three statues for an altar, later dismantled, in the Venetian church of Santa Marina; in the 19th century the Magdalene and the St Catherine were placed on the monument of Doge Andrea Vendramin in Santi Giovanni e Paolo, while the statue of St Marina is at the Seminario Patriarcale. In 1515 Bregno executed sculptures for the altar of St Sebastian in the church of Santa Margherita in Treviso. These consist of a statue of the saint (now Treviso Cathedral) and a relief (now SzÃ©pmÅ±vÃ©szeti MÃºzeum, Budapest), probably by an assistant.\r\nDuring this period Bregno also produced the statues for various funerary monuments in Venice, including that of Benedetto Pesaro (Santa Maria dei Frari; the figure of Mars is by the Tuscan artist Baccio da Montelupo), as well as those of Bartolomeo Bragadin (Santi Giovanni e Paolo) and Lorenzo Gabriel, Bishop of Bergamo (Museum fÃ¼r angewandte Kunst, Vienna). This last work was dismantled after the suppression of the oratory (1810), and the life-size statue of the bishop is now in Vienna.\r\nIn 1514 Bregno obtained the commission for three statues (St Leonard, St Eustace and St Christopher) to decorate the altar of the chapel of San Leonardo in Cesena Cathedral; these were installed in February 1517. Like the preceding works, they appear stylistically related to the Lombardi. The high altar at the church of Santa Maria dei Frari, the attribution of which is disputed by critics, dates from the same period, as does the funerary monument to Bartolino da Terni (signed) in the church of the Santa TrinitÃ  in Crema. The statues in the Scuola di S Rocco, recently attributed to Bregno, and one of St John the Evangelist (Bode Museum, Berlin), can also be assigned to this period.\r\nIn 1522 Bregno worked on the funerary monument to Bertucci Lamberti in Treviso Cathedral. He was active in the Venetian church of Santa Maria Mater Domini in 1524, producing the statues of St Andrew, St Peter and St Paul, perhaps his best works, as they are least influenced by the academicism of the Lombardi. The other works in the church that are attributed to him were executed by his workshop after his death, with the help of the Paduan sculptor Antonio Minello (c. 1465-c. 1529).",
            image: "https://www.wga.hu/biojpg/b/bregno/lorenzo/biograph.jpg",
            wikipedia: null,
            following: false,
            artsCount: 27,
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
