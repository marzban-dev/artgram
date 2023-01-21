import axios from "axios";
import jsdom from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";
const { JSDOM } = jsdom;

const ArtistPictureApi = async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query.q;
    const highQuality = Boolean(req.query.hq);

    if (query) {
        if (highQuality) {
            // const googleResponse = await axios.get(`https://www.google.com/search`, {
            //     params: {
            //         q: query,
            //     },
            // });

            // const googleDom = new JSDOM(googleResponse.data);
            // const googleLink = googleDom.window.document.querySelector(".kCrYT > a") as HTMLAnchorElement;

            // const pageLink = googleLink.href.split("?q=")[1];
            // console.log(pageLink);
            // const linkResponse = await axios.get("https://en.wikipedia.org/wiki/Leonardo_da_Vinci&sa=U&ved=2ahUKEwiQnIqMzM78AhXFtYsKHbAcAHAQFnoECAkQAg&usg=AOvVaw3e_3j9zIX4viIEcYiaaUQl");

            // // const linkDom = new JSDOM(linkResponse.data);

            // res.status(201).send(linkResponse.data);
        } else {
            const response = await axios.get(`https://www.google.com/search`, {
                params: {
                    q: query,
                    tbm: "isch",
                },
            });

            const dom = new JSDOM(response.data);
            const image = dom.window.document.querySelector(".yWs4tf") as HTMLImageElement;

            res.status(201).send(image.src);
        }
    } else {
        res.status(404).send("Not Found");
    }
};

export default ArtistPictureApi;
