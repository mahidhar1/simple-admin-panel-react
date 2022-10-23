import React, { useContext, useEffect, useState } from "react";
import { MembersContext } from "../context/MembersContext";
import { SearchMembersContext } from "../context/SearchMembersContext";

const SearchBox = () => {
  const { query, matchingMembersArray, setQuery, isSearching, setIsSearching } =
    useContext(SearchMembersContext);
  const { membersArray, deleteSelected } = useContext(MembersContext);
  const [value, setValue] = useState(query);

  useEffect(() => {
    setIsSearching(true);
    setTimeout(() => {
      setQuery(value);
      setIsSearching(false);
    }, 2000);
  }, [value, setQuery, setIsSearching]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{
          width: "100%",
          height: "1rem",
          borderRadius: "4px",
          border: "2px solid grey",
          padding: "2px",
        }}
      ></input>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {query.length > 0 && isSearching === true && <p>Searching....</p>}
        {query.length > 0 && isSearching === false && (
          <p>{matchingMembersArray.length} results found</p>
        )}
        {membersArray.some((obj) => obj.isChecked === true) && (
          <button
            onClick={deleteSelected}
            style={{
              height: "2rem",
              marginLeft: "8px",
              backgroundColor: "red",
              color: "white",
              fontWeight: 700,
              borderRadius: "4px",
              border: "2px solid red",
              padding: "4px",
              cursor: "pointer",
            }}
          >
            Delete selected
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
