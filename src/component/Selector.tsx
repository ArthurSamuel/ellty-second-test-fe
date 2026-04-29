import { useState, useEffect, useRef } from "react";
import "./Selector.css";

interface SelectorProps {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}

export default function Selector({ label, checked, onChange }: SelectorProps) {
  const isFirstRender = useRef(true);
  const isReady = useRef(false);
  const [state, setState] = useState("inactive");
  const [arm, setArmed] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (checked) {
      setState("active");
      isReady.current = true;
    } else if (!checked && isReady.current) {
      setState("exit");
      setArmed(false);
      const t = setTimeout(() => {
        setState("inactive");
      }, 250);
      return () => clearTimeout(t);
    }
  }, [checked]);

  function handleClick() {
    onChange(!checked);
  }

  return (
    <div
      className="container"
      onClick={handleClick}
      onMouseLeave={() => {
        if (!arm && state === "active") setArmed(true);
      }}
    >
      <div className="checkboxLabel">{label}</div>

      <div className={`checkbox ${state} ${arm ? "arm" : ""}`}>
        <svg
          className="checkboxIcon"
          width="17"
          height="13"
          viewBox="0 0 17 13"
          fill="none"
        >
          <path
            d="M0.5 6.572L6.04879 11.5072C6.06925 11.5254 6.10055 11.5237 6.11899 11.5035L16.14 0.5"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
