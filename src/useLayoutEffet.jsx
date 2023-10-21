import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import React from "react";
import { render } from "react-dom";

function wait(duration) {
  const t = Date.now();

  while (true) {
    if (Date.now() - t > duration) {
      return true;
    }
  }
}
// useEffet et useLayoutEffect ne sont pas tre dufferent , neamoins si tu veux manipuler le dom avant le rendu, alors utilise useLayoutEffet sinon , useEffet fonctionne de maniere assynchrone
function App() {
  const [count, setCount] = useState(0);
  const button = useRef(null);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  useLayoutEffect(() => {
    if (count % 2 === 0) {
      button.current.style.color = "green";
    } else {
      button.current.style.color = "red";
    }
  }, [count]);

  return (
    <div>
      <button onClick={increment} ref={button}>
        incrementer {count}
      </button>
    </div>
  );
}

render(<App />, document.getElementById("app"));
