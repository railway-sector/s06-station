import { useQuery } from "@tanstack/react-query";
import { dateUpdate } from "../query";
import StationSegmentedList from "./StationSegmentedList";

function Header() {
  const { data } = useQuery<any>({
    queryKey: ["As_Of_Date"],
    queryFn: () => dateUpdate("S05 Station Structure"),
    staleTime: Infinity,
  });
  const asofdate = data ?? "";

  return (
    <>
      <header
        slot="header"
        id="header-title"
        style={{
          display: "flex",
          height: "70px",
          padding: "0 1rem",
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          borderTopWidth: 5,
          borderColor: "#555555",
        }}
      >
        <img
          src="https://EijiGorilla.github.io/Symbols/Projec_Logo/DOTr_Logo_v2.svg"
          alt="DOTr Logo"
          height={"55px"}
          width={"55px"}
          style={{ marginBottom: "auto", marginTop: "auto" }}
        />
        <b
          style={{
            color: "white",
            marginLeft: "1rem",
            fontSize: "2.6vh",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          S-06 Station Structure
        </b>
        <div
          style={{ color: "#d1d5db", marginTop: "auto", marginLeft: "auto" }}
        >
          {!asofdate ? "" : "As of " + asofdate}
        </div>

        {/* Segmented List component */}
        <div
          style={{
            marginBottom: "auto",
            marginTop: "auto",
            marginLeft: "auto",
            display: "flex",
          }}
        >
          <div style={{ marginRight: "100px" }}>
            <StationSegmentedList />
          </div>
          <img
            src="https://EijiGorilla.github.io/Symbols/Projec_Logo/GCR_LOGO.svg"
            alt="GCR Logo"
            height={"50px"}
            width={"75px"}
            style={{ backgroundColor: "#f0e7e7" }}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
