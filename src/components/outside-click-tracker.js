import React from "react";

function useOutsideClickTracking (ref, onClickOutside) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside(true);
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export default function OutsideClickTracker(props) {
  const wrapperRef = React.useRef(null);
  useOutsideClickTracking (wrapperRef, props.onClickOutside);

  return <div ref={wrapperRef}>{props.children}</div>;
}
