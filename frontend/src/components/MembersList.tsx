import React, { useContext, useEffect, useState } from "react";
import { MembersContext } from "../context/MembersContext";
import { PageContext } from "../context/PageContext";
import { SearchMembersContext } from "../context/SearchMembersContext";
import MemberRow from "./MemberRow";

const MembersList = () => {
  const { membersArray } = useContext(MembersContext);
  const { query, matchingMembersArray, isSearching } =
    useContext(SearchMembersContext);
  const { pageIndexing, currentPage } = useContext(PageContext);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  useEffect(() => {
    if (Object.keys(pageIndexing).length === 0 || pageIndexing === undefined) {
      setStartIndex(0);
      setEndIndex(10);
    } else {
      let [start, end] = pageIndexing[currentPage];
      setStartIndex(start ?? 0);
      setEndIndex(end ?? 1);
    }
  }, [pageIndexing, currentPage]);

  return (
    <div>
      <table>
        <thead>
          <tr style={{ backgroundColor: "blue", color: "white" }}>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {query.length > 0 &&
            isSearching === false &&
            matchingMembersArray
              ?.slice(startIndex, endIndex)
              .map((obj) => (
                <MemberRow
                  key={obj.id}
                  id={obj.id}
                  handleCheck={(event) => console.log("is checked", obj.id)}
                  editEntry={() => console.log("edited Entry", obj.id)}
                  deleteEntry={() => console.log("deleted entry", obj.id)}
                  isChecked={false}
                />
              ))}
          {query.length === 0 &&
            membersArray
              ?.slice(startIndex, endIndex)
              .map((obj) => (
                <MemberRow
                  key={obj.id}
                  id={obj.id}
                  handleCheck={(event) => console.log("is checked", obj.id)}
                  editEntry={() => console.log("edited Entry", obj.id)}
                  deleteEntry={() => console.log("deleted entry", obj.id)}
                  isChecked={false}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersList;
