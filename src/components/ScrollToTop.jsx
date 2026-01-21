import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // detect route change

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional: smooth scrolling
    });
  }, [pathname]); // run every time route changes

  return null; // no UI
};

export default ScrollToTop;
