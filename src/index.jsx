import { render } from "react-dom";
import React, { useState, useEffect } from "react";
// parcel est actif ici

function useIncrement(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((c) => c + 10);
  };

  return [count, increment];
}

function useToggle(initialValue = true) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    setValue((v) => !v);
  };

  return [value, toggle];
}

function useFetch(url) {
  const [state, setState] = useState({ items: [], loading: true });

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const responseData = await response.json();
      if (response.ok) {
        setState({ items: responseData, loading: false });
      } else {
        alert(JSON.stringify(responseData));
        setState((s) => ({ ...s, loading: false }));
      }
      setLoading(false);
    })();
  }, []);

  return [state.loading, state.items];
}

function useAutoIncrement(initialValue = 0, step = 1) {
  const [count, increment] = useIncrement(initialValue, step);

  useEffect(() => {
    const timer = window.setInterval(() => {
      increment();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return count;
}

function Compteur() {
  const count = useAutoIncrement(0, 10);
  return <button>increment {count} </button>;
}

function TodoList() {
  const [loading, todos] = useFetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );

  if (loading) {
    return "chargement";
  }

  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}

function PostTable() {
  const [loading, items] = useFetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=10"
  );

  if (loading) {
    return "chargement";
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [compteurVisible, toggleCompteur] = useToggle(true);

  return (
    <div>
      <label>aficher le compteur</label>
      <input
        type="checkbox"
        onChange={toggleCompteur}
        checked={compteurVisible}
      ></input>
      {compteurVisible && <Compteur />}
      <TodoList />
      <PostTable />
    </div>
  );
}

render(
  <div>
    <App />
  </div>
  //activer la ligne ci dessous pour avoir un rendu
  //document.getElementById("app")
);

//====
//====LE CODE COMMENTE CI DESSOUS EST FONCTIONNEL, IL SUFFIT DE COMMENTER LE CODE COURANT ET PUIS DE DECOMENTER LE CODE CI DESSOUS POUR AVOIR UN RENDU
//====

// const useIncrement = (initial, step) => {
//   const [count, setCount] = useState(initial);

//   const increment = () => {
//     setCount((c) => c + step);
//   };

//   return [count, increment];
// };

// const Compteur = () => {
//   const [count, increment] = useIncrement(0, 10);

//   useEffect(() => {
//     const timer = window.setInterval(() => {
//       increment();
//       console.log("hello");
//     }, 1000);

//     return function () {
//       clearInterval(timer);
//     };
//   }, []);

//   useEffect(() => {
//     document.title = "compteur" + count;
//   }, [count]);

//   return (
//     <React.Fragment>
//       <button onClick={increment}>incrementer{count}</button>
//     </React.Fragment>
//   );
// };

// render(
//   <div>
//     <Compteur />
//   </div>,
//   document.getElementById("app")
// );

// window.setTimeout(() => {
//   render(<div> bonjour </div>, document.getElementById("app"));
// }, 3000);
