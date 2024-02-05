import { useRef } from "react";
import FilterModal from "./FilterModal";

export default function Header() {
  const dialog = useRef();

  const handleClick = () => {
    dialog.current.open();
  };

  return (
    <header>
      <button onClick={handleClick} className="displayBtn">
        <span className="material-symbols-outlined">tune</span>{" "}
        <span style={{ padding: "0px 10px" }}> Display </span>
        <span className="material-symbols-outlined">expand_more</span>
      </button>
      <FilterModal ref={dialog} />
    </header>
  );
}
