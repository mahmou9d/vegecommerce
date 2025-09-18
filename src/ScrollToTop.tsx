import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseEnter = async () => {
    await controls.start({
      y: [0, -60, 60, 0],
      opacity: [1, 0, 0, 1],
      transition: { duration: 1, ease: "easeInOut" },
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50
                     bg-[#01e281] text-white hover:bg-[#122d40] overflow-hidden"
        >
          <motion.div animate={controls} onMouseEnter={handleMouseEnter}>
            <FaArrowUp size={20} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
