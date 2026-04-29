import { useState } from "react";
import "./App.css";
import Selector from "./component/Selector";
import Button from "./component/button";

function App() {
  const numberOfPage = 6;
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean[]>(
    Array(numberOfPage).fill(false)
  );

  const handleOnChange = (index: number) => {
    let checked = 1;
    setChecked((prev) =>
      prev?.map((item, indexItem) => {
        if (item === true) {
          checked++;
        }
        if (index === indexItem) {
          item = !item;
        }
        return item;
      })
    );
    setAllChecked(checked === numberOfPage);
  };

  const handleOnChangeAll = () => {
    setChecked((prev) =>
      prev?.map((item) => {
        item = !allChecked;
        return item;
      })
    );
    setAllChecked((prev) => !prev);
  };

  return (
    <div className="card">
      <Selector
        checked={allChecked}
        label="All pages"
        onChange={() => handleOnChangeAll()}
      />
      <div className="gutter">
        <div className="line"></div>
      </div>
      <div className="wrapper">
        {checked?.map((item, index) => (
          <Selector
            key={index}
            checked={item}
            label={`Page ${index + 1}`}
            onChange={() => handleOnChange(index)}
          />
        ))}
      </div>
      <div className="gutter">
        <div className="line"></div>
      </div>
      <div className="buttonContainer">
        <Button />
      </div>
    </div>
  );
}

export default App;
