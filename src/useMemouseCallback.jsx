import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

function wait(duration) {
  const t = Date.now();

  while (true) {
    if (Date.now() - t > duration) {
      return true;
    }
  }
}

const Button = React.memo(function ({ onClick }) {
  console.log("render");
  return <button onClick={onClick}>mon bouton </button>;
});

function App() {
  const [count, setCount] = useState(0);

  // useCallback et useMemo fonctionneraient de la meme maniere, a la difference que useCallback peut se voir etre plus synthetique
  // useCalback est donc utilise pour eviter des rendus consecutifs
  const handleClick = useCallback(
    function () {
      alert("bonjour" + count);
    },
    [count]
  );

  //   const handleClick = useMemo(function () {
  //     alert("bonjour");
  //   }, []);

  return (
    <div>
      <Button onClick={handleClick} />
      <button onClick={() => setCount((c) => c + 1)}>Increment{count}</button>
    </div>
  );

  //   const [name, setName] = useState("john");
  //   const [number, setNumber] = useState(0);

  //   const onChange = function (e) {
  //     if (e.target.getAttribute("name") === "name") {
  //       setName(e.target.value);
  //     }
  //   };

  //   const encoded = useMemo(
  //     function () {
  //       return encodeURI(number);
  //     },
  //     [number]
  //   );

  //   return (
  //     <div>
  //       <div className="form-group">
  //         <label htmlFor="name"></label>
  //         <input
  //           name="name"
  //           id="name"
  //           type="text"
  //           value={name}
  //           onChange={onChange}
  //         ></input>
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="number"></label>
  //         <input
  //           name="number"
  //           id="number"
  //           type="number"
  //           value={number}
  //         ></input>
  //       </div>
  //       <h2>{encoded}</h2>
  //     </div>
  //   );
}

render(
  <div>
    <App />
  </div>,
  document.getElementById("app")
);
