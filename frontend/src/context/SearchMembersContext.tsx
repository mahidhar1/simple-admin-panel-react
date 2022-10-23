import React, { createContext, useContext, useEffect, useState } from "react";
import { MembersContext, MembersState, ResourceObject } from "./MembersContext";
type SearchMembersContextProps = {
  children: React.ReactNode;
};

type SearchMembersContextType = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  matchingMembersArray: ResourceObject[];
  matchingMembersState: MembersState;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchMembersContext = createContext(
  {} as SearchMembersContextType,
);

export const SearchMembersContextProvider = ({
  children,
}: SearchMembersContextProps) => {
  const { membersArray } = useContext(MembersContext);
  const [matchingMembersArray, setMatchingMembersArray] = useState<
    ResourceObject[]
  >([]);
  const [matchingMembersState, setMatchingMembersState] =
    useState<MembersState>({} as MembersState);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let filtered = membersArray.filter((obj) => {
      return (
        obj.name.includes(query) ||
        obj.email.includes(query) ||
        obj.role.includes(query)
      );
    });
    setMatchingMembersArray(filtered);
    let temp = filtered.reduce((acc: MembersState, curr: ResourceObject) => {
      return { ...acc, [curr.id]: curr };
    }, {});
    setMatchingMembersState(temp);
  }, [query, membersArray]);
  return (
    <SearchMembersContext.Provider
      value={{
        query,
        setQuery,
        matchingMembersArray,
        matchingMembersState,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </SearchMembersContext.Provider>
  );
};

// const nameMatch = (input: string, name: string) => {
//   let regex = new RegExp(input.toLowerCase(), "g");
//   console.log("name match", regex.test(name.toLowerCase()));
//   return regex.test(name.toLowerCase());
// };

// const emailMatch = (input: string, email: string) => {
//   let regex = new RegExp(input.toLowerCase(), "g");
//   console.log("email match", regex.test(email.toLowerCase()));
//   return regex.test(email.toLowerCase());
// };

// const roleMatch = (input: string, role: string) => {
//   let regex = new RegExp(input.toLowerCase(), "g");
//   console.log("role match", regex.test(role.toLowerCase()));
//   return regex.test(role);
// };

// const testMatch = (
//   input: string,
//   name: string,
//   email: string,
//   role: string,
// ) => {
//   let n1 = nameMatch(input, name);
//   let e1 = emailMatch(input, email);
//   let r1 = roleMatch(input, role);
//   let overall = n1 || e1 || r1;
//   console.log(n1, e1, r1, overall);
//   return overall;
// };
