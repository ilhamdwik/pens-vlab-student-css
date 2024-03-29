import React from "react";
import { Link  } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export const Hero = () => {
    const [index, setIndex] = React.useState(0);
    // const texts = ["Belajar", "Bereksperimen", "Mencoba Hal Baru"];
    const texts = ["Learn", "Experiment", "Trying New Things"];

    React.useEffect(() => {
        setTimeout(() => {
            let next = index + 1;
            if (next === texts.length) {
                next = 0;
            }
            setIndex(next);
        }, 3 * 1000);
    }, [index, setIndex, texts.length]);

    return(
        <div 
            style={{
                backgroundImage: `url(${require("../assets/images/test2.jpg").default})`,
            }}
        >
            <div className="mx-auto px-6 lg:px-32 pt-8 pb-12 lg:py-12 flex items-center bg-gradient-to-l from-blueGray-900">
                <div className="flex-1 hidden lg:block" />
                <div className="flex-1">
                    <div className="mb-4 flex space-x-8">
                        <img 
                            src={require("../assets/images/pens_putih.png").default}
                            alt="pens"
                            className="w-12 h-12"
                        />
                    </div>
                    <div className="text-2xl lg:text-4xl text-white font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                        {/* Platform untuk&nbsp; */}
                        Platforms for&nbsp;
                        <AnimatePresence>
                            <motion.span
                                className=""
                                style={{ position: "absolute" }}
                                variants={{
                                    enter: () => {
                                        return {
                                            y: -20,
                                            opacity: 0,
                                        };
                                    },
                                    center: {
                                        zIndex: 1,
                                        y: 0,
                                        opacity: 1,
                                    },
                                    exit: () => {
                                        return {
                                            zIndex: 0,
                                            opacity: 0,
                                        };
                                    },
                                }}
                                key={index}
                                initial="center"
                                exit="exit"
                                transition={{
                                    y: { type: "tween" },
                                    opacity: { duration: 0.3 },
                                }}
                            >
                                {texts[index]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <div className="text-md lg:text-lg text-white mt-4">
                        {`Find the best learning experience and improve your programming skills. 
                        Learn the fundamentals of programming languages using the available courses. 
                        Experiment with code using Playground.`}
                        {/* {`Temukan pengalaman belajar terbaik dan tingkatkan kemampuanmu pada pemrograman.
                        \nBelajar fundamental dari bahasa pemrograman menggunakan course yang tersedia. 
                        Bereksperimen dengan kode menggunakan Playground.`} */}
                    </div>

                    <Link to="/courses">
                        <button className="inline-flex items-center px-6 py-3 rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none mt-8">
                            {/* Mulai Belajar */}
                            Start Learning
                            <i className="fas fa-arrow-right ml-4 mt-1" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;