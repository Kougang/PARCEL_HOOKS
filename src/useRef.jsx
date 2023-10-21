import React, { useRef } from "react";
import { render } from "react-dom";

function App() {
  const input = useRef(null);
  const compteur = useRef({ count: 0 });

  const handleButtonClick = function () {
    // console.log(input.current.value);
    compteur.current.count++;
    console.log(compteur);
  };

  return (
    <div>
      <input type="text" ref={input} />
      <button onClick={handleButtonClick}> reccuperer la valeur</button>
    </div>
  );
}

render(<App />, document.getElementById("app"));
