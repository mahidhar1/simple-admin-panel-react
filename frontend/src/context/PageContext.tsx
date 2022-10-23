import { createContext, useContext, useEffect, useState } from "react";
import { MembersContext, ResourceObject } from "./MembersContext";
import { SearchMembersContext } from "./SearchMembersContext";

type PageContextProviderProps = {
  children: React.ReactNode;
};

type PageIndexType = {
  [index: string]: number[];
};

type PageIndexContextType = {
  pageIndexing: PageIndexType;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
};

export const PageContext = createContext({} as PageIndexContextType);

export const PageContextProvider = ({ children }: PageContextProviderProps) => {
  const { membersArray } = useContext(MembersContext);
  const { matchingMembersArray, query } = useContext(SearchMembersContext);

  const [pageIndexing, setPageIndexing] = useState({} as PageIndexType);
  const [currentPage, setCurrentPage] = useState("1");

  useEffect(() => {
    if (query.length > 0) {
      setPageIndexing(computePageIndexing(matchingMembersArray));
    } else {
      setPageIndexing(computePageIndexing(membersArray));
    }
  }, [query, membersArray, matchingMembersArray]);

  return (
    <PageContext.Provider value={{ pageIndexing, currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

const computePageIndexing = (arr: ResourceObject[]) => {
  let result = {} as PageIndexType;
  let totalPages = Math.ceil(arr.length / 10);
  for (let i = 0; i < totalPages; i++) {
    if (i === 0) {
      result[i + 1] = [0, 10];
    } else if (i === totalPages - 1) {
      result[i + 1] = [i * 10, (arr.length % 10) + i * 10];
    } else {
      result[i + 1] = [10 * i + 1, 10 * i + 10];
    }
  }
  return result;
};
