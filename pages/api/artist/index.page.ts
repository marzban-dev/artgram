import axios from "axios";
import jsdom from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";
const { JSDOM } = jsdom;

const ArtistPictureApi = async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query.q;

    if (query) {
        // Get search result page and get artist page
        const searchResponse = await axios.get(`https://artsandculture.google.com/search`, {
            params: {
                q: query,
            },
        });

        const searchResponseDom = new JSDOM(searchResponse.data);

        const artistLink = searchResponseDom.window.document.querySelector(
            'a[href*="categoryId=artist"]'
        ) as HTMLLinkElement;

        if (artistLink) {
            const artistResponse = await axios.get("https://artsandculture.google.com" + artistLink.href);

            // Get artist page and scrap information
            const artistResponseDom = new JSDOM(artistResponse.data);

            const artistAge = artistResponseDom.window.document.querySelector(".CazOhd") as HTMLHeadElement;

            const artistDescription = artistResponseDom.window.document.querySelector(
                ".zzySAd.gI3F8b"
            ) as HTMLDivElement;

            const artistQuote = artistResponseDom.window.document.querySelector(".fO9Uwd") as HTMLHeadingElement;

            const artistBackground = artistResponseDom.window.document.querySelector(".ldhC4e") as HTMLDivElement;

            const artistBackgroundUrl = "https:" + artistBackground.getAttribute("data-bgsrc");

            res.status(201).json({
                background: artistBackgroundUrl,
                age: artistAge.innerHTML,
                quote: artistQuote?.innerHTML,
                description: artistDescription.innerHTML,
                googlearts: "https://artsandculture.google.com" + artistLink.href,
            });
        }

        res.status(404).send("Not Found");
    } else {
        res.status(403).send("Please provide query in the url eg: q=something");
    }
};

export default ArtistPictureApi;
