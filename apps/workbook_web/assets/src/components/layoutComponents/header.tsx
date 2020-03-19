import React from "react";
import { NavLinks } from "./navLinks";
type HeaderProps = {
  links: string[];
  selectLink: (arg0: number) => void;
  selectedLinkIndex: number;
};
const LogoCircle = () => (
  <div className="mx-4 rounded-full h-16 w-16 flex items-center justify-center bg-gray-700" />
);
export const Header: React.FC<HeaderProps> = ({
  links,
  selectLink,
  selectedLinkIndex
}) => (
  <div className="flex w-full bg-gray-200" style={{ height: "75px" }}>
    <div className="flex items-center justify-around">
      <LogoCircle />
      <NavLinks
        links={links}
        selectLink={selectLink}
        selectedLinkIndex={selectedLinkIndex}
      />
    </div>
    <div className="flex flex-1 justify-end">
      <div className="flex flex-col justify-center mr-3">
        <input
          className="rounded-full py-2 px-4"
          name="search"
          placeholder="search"
        />
      </div>
    </div>
  </div>
);
