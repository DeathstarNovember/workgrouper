import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

type NavLinksProps = {
  links: { name: string; path: string }[];
};
const Links: React.FC<NavLinksProps & RouteComponentProps> = ({
  links,
  location
}) => {
  return (
    <div className="flex flex-1">
      {links.map((link, linkIndex) => (
        <Link
          key={`navLink${linkIndex}`}
          to={link.path}
          className={`mr-2 mr-5 cursor-pointer ${
            link.path === location.pathname ? "text-gray-900" : "text-gray-600"
          } `}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};
export const NavLinks = withRouter(Links);
