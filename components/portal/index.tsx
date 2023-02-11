import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IPortalProps } from "./portal.types";

export const Portal: React.FC<IPortalProps> = ({ children }) => {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector<HTMLElement>("#portal");
        setMounted(true);
    }, []);

    return mounted && ref.current ? createPortal(children, ref.current) : null;
};
