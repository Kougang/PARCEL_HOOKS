import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import React from "react";
import { render } from "react-dom";

// le usestate est utile dans le cas des changement superficielle des etats , mes si le changement vas etre important il est d autant plus conseille d'utiliser un useReducer()

function init(initialValue) {
  return { count: initialValue };
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + (action.payload || 1) };
    case "decrement":
      if (state.count <= 0) {
        return state;
      }
      return { count: state.count - 1 };
    case "reset":
      return init(0);
    default:
      throw new Error("l action" + "" + action.type + "" + "est inconnue");
  }
}

function App() {
  const [count, dispatch] = useReducer(reducer, 0, init);

  return (
    <div>
      compteur:{JSON.stringify(count)}
      <button onClick={() => dispatch({ type: "increment", payload: 10 })}>
        increment + 10
      </button>
      <button onClick={() => dispatch({ type: "increment" })}>increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        decrementer
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>reinitialiser</button>
      <Child />
    </div>
  );
}

function Child() {
  console.log("render");
  return <div>hello</div>;
}

render(<App />, document.getElementById("app"));
