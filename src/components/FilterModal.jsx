import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { filteringActions } from "../store/filtering";

const FilterModal = forwardRef(function FilterModal({ display }, ref) {
  const dialog = useRef();
  const dispatch = useDispatch();
  const initialGroupValue = localStorage.getItem("group");
  const groupRef = useRef(initialGroupValue);
  const initialOrderValue = localStorage.getItem("order");
  const orderRef = useRef(initialOrderValue);

  useEffect(() => {
    groupRef.current.value = initialGroupValue ?? "status";
    dispatch(filteringActions.changeGroup(groupRef.current.value));

    orderRef.current.value = initialOrderValue ?? "title";
    dispatch(filteringActions.changeOrder(orderRef.current.value));
  }, []);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const handleGroupChange = (event) => {
    const value = event.target.value;
    dispatch(filteringActions.changeGroup(value));
  };

  const handleOrderChange = (event) => {
    const value = event.target.value;
    dispatch(filteringActions.changeOrder(value));
  };

  return createPortal(
    <dialog ref={dialog} className="modal">
      <div className="modal-content">
        <p className="filterContainer">
          <label className="filterLabel" htmlFor="filter">
            Grouping
          </label>
          <select
            className="filterSelect"
            onChange={handleGroupChange}
            ref={groupRef}
          >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </p>
        <p className="filterContainer">
          <label className="filterLabel" htmlFor="filter">
            Ordering
          </label>
          <select
            className="filterSelect"
            onChange={handleOrderChange}
            ref={orderRef}
          >
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
        </p>
        <form className="btnForm" method="dialog">
          <button className="closeBtn">Close</button>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default FilterModal;
