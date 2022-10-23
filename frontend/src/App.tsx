import "./App.css";
import SearchBox from "./components/SearchBox";
import MembersList from "./components/MembersList";
import Pagination from "./components/Pagination";
import { MembersContextProvider } from "./context/MembersContext";
import { SearchMembersContextProvider } from "./context/SearchMembersContext";
import { PageContextProvider } from "./context/PageContext";

function App() {
  return (
    <MembersContextProvider>
      <SearchMembersContextProvider>
        <PageContextProvider>
          <div className="App">
            <div style={{ margin: "0px 8px 8px 8px" }}>
              <SearchBox />
            </div>
            <div style={{ margin: "0px 8px 0px 8px" }}>
              <MembersList />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0px",
                //left: "50%",
                margin: "0 auto",
                width: "100%",
                //height: "1.5rem",
                border: "2px solid blue",
                //margin: "0px 8px 0px 8px",
                backgroundColor: "white",
              }}
            >
              <Pagination />
            </div>
          </div>
        </PageContextProvider>
      </SearchMembersContextProvider>
    </MembersContextProvider>
  );
}

export default App;
