import React from "react";
import { NavLinks } from "./navLinks";
import { User } from "../../types";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
type HeaderProps = {
  links: string[];
  selectLink: (arg0: number) => void;
  selectedLinkIndex: number;
  currentUser?: User;
};
const LogoCircle: React.FC<{ label?: string }> = ({ label }) => (
  <div className="mx-4 rounded-full h-16 w-16 flex items-center justify-center bg-gray-700 cursor-pointer">
    {label ? label : ""}
  </div>
);

const logOutMutation = gql`
  mutation LogOut($id: ID!) {
    signOut(id: $id) {
      id
    }
  }
`;
export const Header: React.FC<HeaderProps> = ({
  links,
  selectLink,
  selectedLinkIndex,
  currentUser
}) => {
  const [logOut] = useMutation(logOutMutation, {
    onCompleted: () => {
      localStorage.clear();
      window.location.reload(true);
    }
  });
  const handleLogOut = () => {
    logOut({ variables: { id: currentUser?.id } });
  };
  return (
    <div className="flex w-full bg-gray-200" style={{ height: "75px" }}>
      <div className="flex items-center justify-around">
        <LogoCircle
          label={currentUser ? currentUser.username[0].toUpperCase() : ""}
        />
        <NavLinks
          links={links}
          selectLink={selectLink}
          selectedLinkIndex={selectedLinkIndex}
        />
      </div>
      <div className="flex flex-1 items-center justify-end">
        <div className="text-gray-600">{currentUser?.username}</div>
        <button
          onClick={handleLogOut}
          className="bg-gray-100 mx-5 p-2 text-gray-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
