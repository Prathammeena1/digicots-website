import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ThankyouPopUp from "./ThankyouPopup";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Variants for staggered children (form inputs, links, social icons)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, scale: 1.2, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Social icons slide from left
const socialIconVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Footer({ popActive, setPopActive }) {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 }); // Trigger when 20% visible
  const initFormData = {
    Full_Name: "",
    Company_Name: "",
    email: "",
    // countryCode: "",
    Contact_Number: "",
  };

  const [formData, setFormData] = useState(initFormData);

  const [message, setMessage] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const isSuccess = params.get("success") === "true";
  //   const validPaths = ["/", "/about", "/insights", "/case-study", "/things-we-do"];

  //   if (isSuccess && validPaths.includes(location.pathname)) {
  //     setPopActive(true);
  //     // Clean the URL without reloading
  //     const cleanedURL = location.pathname;
  //     window.history.replaceState({}, "", cleanedURL);
  //   }
  // }, [location]);

  const validateForm = () => {
    const requiredFields = [
      "Full_Name",
      "Company_Name",
      "email",
      "Contact_Number",
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        const formattedField = field
          .replace(/([A-Z])/g, " $1") // Add space before capital letters
          .replace("_", " ") // In case there's any underscore
          .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize each word
        return `❌ Please fill out "${formattedField}"`;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return "❌ Please enter a valid email address.";
    }

    // const phone = formData.contactNumber?.trim();
    // // const phoneRegex = /^\d{10}$/;
    // const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

    // if (!phoneRegex.test(phone)) {
    //   return "❌ Contact number must be exactly 10 digits.";
    // }

    return null;
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const error = validateForm();
      if (error) {
        setMessage(error);
        return;
      }

      const response = await fetch(
        "https://formsubmit.co/ajax/Dominance@digicots.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result) {
        setPopActive(true);
        setFormData(initFormData);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-black backdrop-blur-xl text-white py-16 px-6 relative z-[999] overflow-hidden"
    >
      <div className="container mx-auto max-w-[1600px]">
        {/* Top Section - Join the Pack */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Left - Text */}
          <motion.div
            className="md:w-[25%] text-center md:text-left"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-5xl sm:text-8xl font-inter font-bold leading-tight text-white audiowide-regular">
              Join the Pack
            </h2>
            {/* <p className="text-gray-400 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p> */}
          </motion.div>

          {/* Right - Form */}
          <motion.div
            className="md:w-[65%] w-full"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <motion.input
                value={formData.Full_Name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Full_Name: e.target.value,
                  }))
                }
                type="text"
                placeholder="Full Name"
                className="bg-[#3A3A3A]  p-4 sm:p-5 rounded-[14px] w-full focus:outline-none text-white raleway"
                name="Full_Name"
                variants={childVariants}
              />
              <motion.input
                value={formData.Company_Name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Company_Name: e.target.value,
                  }))
                }
                type="text"
                placeholder="Company Name"
                className="bg-[#3A3A3A] p-4 sm:p-5 rounded-[14px] w-full focus:outline-none text-white raleway"
                name="Company_Name"
                variants={childVariants}
              />
              <motion.input
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                placeholder="Email Address"
                className="bg-[#3A3A3A] text-white p-4 sm:p-5 rounded-[14px] w-full focus:outline-none raleway"
                name="email"
                variants={childVariants}
              />
              <motion.div className="flex" variants={childVariants}>
                {/* <select
                  onChange={handleChange}
                  className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 rounded-l-[14px] focus:outline-none"
                >
                  <option value="+1">+1</option>
                  <option value="+91">+91</option>
                  <option value="+44">+44</option>
                </select> */}
                <input
                  type="text"
                  value={formData.Contact_Number}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Contact_Number: e.target.value,
                    }))
                  }
                  placeholder="Contact Number"
                  className="bg-[#3A3A3A] text-white p-4 sm:p-5 w-full rounded-[14px] focus:outline-none raleway"
                  name="Contact_Number"
                />
              </motion.div>
              <motion.button
                className="md:col-span-2 p-4 sm:p-5 font-bold rounded-[14px] relative items-center justify-center overflow-hidden bg-[#ED510C] text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-[15px] before:bg-black before:duration-500 before:ease-out  hover:before:h-56 hover:before:w-full flex px-5 py-2 cursor-pointer raleway"
                variants={childVariants}
              >
                <div className="relative z-[11]">
                  {loading ? "Submitting..." : "Let's Talk about the Future"}
                </div>
              </motion.button>
            </form>
            {message && (
              <p className="text-sm text-white mt-2 font-semibold">{message}</p>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-700 my-12 raleway"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        ></motion.div>

        {/* Bottom Section - Footer Content */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
            <motion.h3
              className="text-4xl font-bold text-[#ED510C]"
              variants={childVariants}
            >
              <Link to={"/"}>
                <img
                  src="https://digicots.com/images/logo.png"
                  className="max-w-[200px]"
                  alt=""
                />
              </Link>
            </motion.h3>
            <motion.div
              className="flex space-x-3 mt-4 raleway"
              variants={containerVariants}
            >
              {[
                {
                  title: "instagram",
                  link: "https://www.instagram.com/digicots_/",
                },
                {
                  title: "linkedin-in",
                  link: "https://www.linkedin.com/company/digicots-interactive-private-limited/",
                },
                // {
                //   title: "facebook-f",
                //   link: "insights",
                // },
                // {
                //   title: "twitter",
                //   link: "contact",
                // },
              ].map((icon,i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 bg-gray-800 rounded-md flex justify-center items-center"
                  variants={socialIconVariants}
                >
                  <a href={icon.link} target="_blank">
                    <i className={`fab fa-${icon.title}`}></i>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Address */}
          <motion.div
            className="sm:text-left sm:max-w-[250px] col-span-2 sm:col-span-1"
            variants={childVariants}
          >
            <h4 className="text-lg font-semibold raleway">India</h4>
            <p className="text-gray-400 mt-2  raleway">
              <a href="">
                B 73, Block B, Sector 57 <br /> Noida, Uttar Pradesh, India
              </a>
            </p>
            <p className="mt-2  text-gray-400 raleway">+91 987 987 5632</p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex sm:justify-end gap-5 md:gap-10 lg:gap-20  md:justify-around md:text-left raleway"
            variants={containerVariants}
          >
            {["Services"].map((header, idx) => (
              <div key={idx}>
                <motion.h4 className="font-semibold" variants={childVariants}>
                  {header}
                </motion.h4>
                <motion.ul
                  className="text-gray-400 mt-2 space-y-1"
                  variants={containerVariants}
                >
                  {[
                    {
                      title: "Content Production",
                      pera: "The art of storytelling by transforming ideas into captivating visual narratives that engage...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-9.png",
                      id: "content-production",
                    },
                    {
                      title: "Outreach Solutions",
                      pera: "In today's super crowded market, old-school ads just don't cut it anymore. Really connecting with...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-8.png",
                      id: "outreach-solutions",
                    },
                    {
                      title: "Public Relations",
                      pera: "This is the art of shaping and maintaining a brand’s reputation – its most valuable asset...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-4.png",
                      id: "public-relations",
                    },
                    {
                      title: "Digital Marketing",
                      pera: "We do way more than just post on social media. We build real strategies with data behind...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-6.png",
                      id: "digital-marketing",
                    },
                    {
                      title: "Performance Marketing",
                      pera: "We're all about getting you the best returns on your advertising budget. We do this by creating...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-5.png",
                      id: "performance-marketing",
                    },
                    {
                      title: "Creative Designing",
                      pera: "Turn concepts into striking visual assets – digital or print. Design is way more than just aesthetics...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-7.png",
                      id: "creative-designing",
                    },
                    {
                      title: "Branding",
                      pera: "We're all about getting you the best returns on your advertising budget. We do this by creating...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-4.png",
                      id: "branding",
                    },
                    {
                      title: "Outdoor Advertising",
                      pera: "Regardless of the ever-changing digital landscape, outdoor advertising remains an unparalleled...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-3.png",
                      id: "outdoor-advertising",
                    },
                    {
                      title: "Website Development",
                      pera: "Think of a website like your brand's online home. It's not just a place on the internet, it's how people...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-1.png",
                      id: "website-development",
                    },
                    {
                      title: "Artificial Reality (AR)",
                      pera: "The future of marketing is immersive. AR brings products to life – allowing consumers to virtually...",
                      icon: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-2.png",
                      id: "artificial-reality",
                    },
                  ].map((link, i) => (
                    <motion.li key={i} variants={childVariants}>
                      <Link to={`discover?i=${i}`} className="hover:text-white">
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}

            {["Quick Links"].map((header, idx) => (
              <div key={idx}>
                <motion.h4 className="font-semibold" variants={childVariants}>
                  {header}
                </motion.h4>
                <motion.ul
                  className="text-gray-400 mt-2 space-y-1"
                  variants={containerVariants}
                >
                  {[
                    {
                      title: "About Us",
                      id: "about",
                    },
                    {
                      title: "Insights",
                      id: "insights",
                    },
                    {
                      title: "Things We Do",
                      id: "things-we-do",
                    },
                    {
                      title: "Case Study",
                      id: "case-study",
                    },
                    {
                      title: "Let's Talk",
                      id: "contact",
                    },
                    {
                      title: "Discover",
                      id: "discover",
                    },
                  ].map((link, i) => (
                    <motion.li key={i} variants={childVariants}>
                      <Link to={`/${link.id}`} className="hover:text-white">
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="mt-12 text-gray-400 flex flex-col sm:flex-row justify-between align-middle"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div>
            <p className="text-center sm:text-start raleway">
              Designed by{" "}
              <a href="#" className="text-[#ED510C]">
                Team Digicots
              </a>
            </p>
            <p className="mt-1 text-center sm:text-start raleway">Created Proudly in India</p>
          </div>
          <div className="text-center sm:text-end raleway">
            <p className="mt-1">
              Copyright 2025 © <br /> All Rights Reserved. All Wrongs Reversed.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
