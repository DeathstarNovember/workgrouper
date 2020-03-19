import React from "react";

type NavLinksProps = {
  links: string[];
  selectLink: (arg0: number) => void;
  selectedLinkIndex: number;
};
export const NavLinks: React.FC<NavLinksProps> = ({
  links,
  selectLink,
  selectedLinkIndex
}) => {
  return (
    <div className="flex flex-1">
      {links.map((link, linkIndex) => (
        <div
          key={`navLink${linkIndex}`}
          onClick={() => selectLink(linkIndex)}
          className={`mr-2 mr-5 cursor-pointer ${
            linkIndex === selectedLinkIndex ? "text-gray-900" : "text-gray-600"
          } `}
        >
          {link}
        </div>
      ))}
    </div>
  );
};
