import { FastAverageColor } from "fast-average-color";
import { useEffect, useState } from "react";
// @ts-ignore
import Color from "color";

interface IColorsResult {
    primary: string;
    lighter: string;
}

type TUseImageColorsParams = (
    query: string,
    options?: {
        darkPrimary?: number;
        lightPrimary?: number;
        darkLighter?: number;
        lightLighter?: number;
    }
) => IColorsResult | null;

const useImageColors: TUseImageColorsParams = (query, options) => {
    const [imageColors, setImageColors] = useState<IColorsResult | null>(null);

    useEffect(() => {
        const fac = new FastAverageColor();
        const imageContainer = document.querySelector(query) as HTMLImageElement;

        fac.getColorAsync(imageContainer, { algorithm: "sqrt" })
            .then((color) => {
                let colorsObject: IColorsResult = {
                    primary: "",
                    lighter: "",
                };

                if (color.isDark) {
                    colorsObject.primary = Color(color.rgb)
                        .lighten(options?.darkPrimary ? options?.darkPrimary : 0.5)
                        .hex();
                    colorsObject.lighter = Color(color.rgb)
                        .lighten(options?.darkLighter ? options?.darkLighter : 0.6)
                        .hex();
                } else {
                    colorsObject.primary = Color(color.rgb)
                        .darken(options?.lightPrimary ? options?.lightPrimary : 0.3)
                        .hex();
                    colorsObject.lighter = Color(color.rgb)
                        .darken(options?.lightLighter ? options?.lightLighter : 0.2)
                        .hex();
                }

                setImageColors(colorsObject);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return imageColors;
};

export default useImageColors;
