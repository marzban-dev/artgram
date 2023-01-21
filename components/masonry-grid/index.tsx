import { useEffect } from "react";
import { IMasonryGridProps } from "./masonry-grid.types";

const MasonryGrid: React.FC<IMasonryGridProps> = ({ children }) => {
    useEffect(() => {
        // @ts-ignore
        const masonryGrid = new Masonry(".masonry-grid", {
            percentPosition: true,
            itemSelector: ".grid-item",
        });
    });

    return <div className="masonry-grid w-full">{children}</div>;
};

export default MasonryGrid;
