import { useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = ({ tech, techSite, place, placeSite, author, linkedin }) => {
  const { pathname } = useLocation();
  if (pathname === "/alloffersmap" || pathname === "/user/favorites") {
    return null;
  }
  return (
    <footer>
      <div className="footer">
        {" "}
        Made with{" "}
        <a href={techSite} target="_blank" rel="noreferrer">
          {" "}
          {tech}{" "}
        </a>{" "}
        at
        <a href={placeSite} target="_blank" rel="noreferrer">
          {" "}
          {place}{" "}
        </a>{" "}
        by{" "}
        <a href={linkedin} target="_blank" rel="noreferrer">
          {" "}
          {author}{" "}
        </a>
        <a
          href="https://github.com/BorisLabianca"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a href={linkedin} target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
