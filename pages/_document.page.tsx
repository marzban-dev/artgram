import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="manifest" href="/manifest.json"/>
                <meta name="theme-color" content="#232323"/>
                <link rel="apple-touch-icon" href="/icon-384x384.png"></link>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body className="font-lato overflow-x-hidden bg-black">
                <Main />
                <div id="portal" />
                {/* this div is only exist for getting correct 100vh size in px */}
                <div className="h-screen w-0 fixed" id="full-height-element" />
                <NextScript />
                <script type="text/javascript" src="/assets/js/masonry.pkgd.min.js" defer></script>
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"
                    defer
                ></script>
            </body>
        </Html>
    );
}
