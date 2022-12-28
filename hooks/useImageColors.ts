import { useEffect, useState } from "react";
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
// @ts-ignore
import Color from "color";

interface IColorsResult {
    primary: string;
    lighter: string;
}

const useImageColors = (query: string) => {
    const [imageColors, setImageColors] = useState<IColorsResult | null>(null);

    useEffect(() => {
        const fac = new FastAverageColor();
        const imageContainer = document.querySelector(query) as HTMLImageElement;

        fac.getColorAsync(imageContainer)
            .then((color) => {
                let colorsObject: IColorsResult = {
                    primary: "",
                    lighter: "",
                };

                if (color.isDark) {
                    colorsObject.primary = Color(color.rgb).lighten(0.5).hex();
                    colorsObject.lighter = Color(color.rgb).lighten(0.6).hex();
                } else {
                    colorsObject.primary = Color(color.rgb).darken(0.3).hex();
                    colorsObject.lighter = Color(color.rgb).darken(0.2).hex();
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
