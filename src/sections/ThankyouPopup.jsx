import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThankyouPopUp({ popActive, onClose }) {
  return (
    <AnimatePresence>
      {popActive && (
        <motion.div
          initial={{ opacity: 0,scale: 1.1, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{  opacity: 0,scale: 1.1, filter: "blur(4px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 py-50 backdrop-blur-sm top-0 left-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative bg-[#111] rounded-2xl max-w-2xl w-full text-center py-10 px-6 md:px-10 shadow-lg text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 bg-[#111] w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer"
            >
              ×
            </button>

            {/* Thank You Heading */}
            <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text bg-gradient-to-r flex items-center text-[#ED510C] mb-6 justify-center">
              THANK Y
              <img
                src="thankyou.gif"
                className="bg-no-repeat bg-center bg-contain w-[35px] md:w-[50px] h-[35px] md:h-[50px] align-middle mx-1"
                alt=""
              />
              U
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6">
              We have received your response. <br /> Our DigiCare Team will get
              back to you within the next 72 hours. <br /> Adios✨
            </p>

            {/* Follow Us */}
            <div className="mt-6">
              <p className="text-[#ED510C] font-semibold mb-4">Follow us on:</p>
              <div className="flex justify-center space-x-4 text-xl">
                <a href="#" className="hover:text-[#ED510C]">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-[#ED510C]">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-[#ED510C]">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}