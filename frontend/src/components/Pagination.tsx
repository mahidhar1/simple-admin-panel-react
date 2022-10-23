import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";
import ArrowRightLineIcon from "@rsuite/icons/ArrowRightLine";
import { IconButton } from "rsuite";

const Pagination = () => {
  const { pageIndexing, currentPage, setCurrentPage } = useContext(PageContext);
  return (
    <div>
      <IconButton>
        <ArrowLeftLineIcon />
      </IconButton>
      {Object.keys(pageIndexing).map((index) => (
        <IconButton
          style={{
            borderRadius: "50%",
            margin: "10px 8px",
            backgroundColor: `${index === currentPage ? "blue" : "white"}`,
            color: `${index === currentPage ? "white" : "black"}`,
            cursor: "pointer",
          }}
          onClick={() => setCurrentPage(index)}
        >
          {index}
        </IconButton>
      ))}
      <IconButton>
        <ArrowRightLineIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
