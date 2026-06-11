import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { lenis } from "./Navbar";
import "./styles/FloatingHomeButton.css";

const FloatingHomeButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const target = document.getElementById("home");
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, {
          duration: 1.5,
        });
      } else {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <button
      className={`floating-home-button ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Home"
      data-cursor="disable"
    >
      <FaChevronUp />
    </button>
  );
};

export default FloatingHomeButton;
