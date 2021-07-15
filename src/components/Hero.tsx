import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export const Hero = () => {
  const [index, setIndex] = React.useState(0);
  const texts = [" Learn", " Discover", " Experiment"];

  React.useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === texts.length) {
        next = 0;
      }
      setIndex(next);
    }, 3 * 1000);
  }, [index, setIndex, texts.length]);

  return (
    <div
      style={{
        backgroundImage: `url(${require("../assets/images/hero.jpg").default})`,
      }}
    >
      <div className="mx-auto px-6 lg:px-32 pt-8 pb-12 lg:py-20 flex items-center bg-gradient-to-l from-blueGray-800">
        <div className="flex-1 hidden lg:block" />
        <div className="flex-1 ">
          <div className="mb-8 flex space-x-8">
            <img
              src="https://ethol.pens.ac.id/pens_putih.png"
              alt="pens putih"
              className="w-12 h-12"
            />
          </div>
          <div className="text-2xl lg:text-4xl text-white font-bold">
            Platform to&nbsp;
            <AnimatePresence>
              <motion.span
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
                initial="enter"
                animate="center"
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
            {`Find the best learning experience and improve your abilities in
              programming.\nLearn fundamentals of programming languages using our courses.
              Experiment with codes using our code playground.`}
          </div>

          <Link to="/vlab/courses">
            <button className=" inline-flex items-center px-6 py-3 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none mt-8">
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
