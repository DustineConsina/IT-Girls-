import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="text-center p-3">
      © {new Date().getFullYear()} SorSU NEXUS - All rights reserved.
    </footer>
  );
};

export default Footer;
