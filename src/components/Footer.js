const Footer = ({ tech, techSite, place, placeSite, author, linkedin }) => {
  return (
    <footer>
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
    </footer>
  );
};
export default Footer;
