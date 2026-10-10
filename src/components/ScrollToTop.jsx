import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleHomeScroll = () => {
    if (pathname === "/") {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    window.addEventListener("homeScrollTop", handleHomeScroll);

    return () => {
      window.removeEventListener("homeScrollTop", handleHomeScroll);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
