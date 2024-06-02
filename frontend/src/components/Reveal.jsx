import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Reveal({ children, late }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControl = useAnimation();
    const slideControl = useAnimation();
    useEffect(() => {
        if (isInView) {
            mainControl.start("visible");
            slideControl.start("visible");
        }
    }, [isInView]);
    return (
        <>
            <motion.div
                ref={ref}
                variants={{
                    hidden: {
                        opacity: late ? 0 : 0,
                        y: late ? 50 : -50,
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                    },
                }}
                initial="hidden"
                animate={mainControl}
                transition={{
                    duration: late ? 1 : 0.5,
                    delay: late ? 1 : 0.1,
                }}
            >
                {children}
            </motion.div>
        </>
    );
}
