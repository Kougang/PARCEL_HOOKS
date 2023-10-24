import React, { useState, useEffect } from "react";
import ReactDOM, { createPortal } from "react-dom";

// Les Portals en React sont une fonctionnalité puissante qui vous permet de rendre un composant React en
// dehors de l'arborescence du DOM de votre application, tout en maintenant la gestion des événements et la
// communication entre les composants. Les Portals ont été introduits pour résoudre divers problèmes, notamment
// le rendu de composants modaux, de notifications ou d'autres éléments qui doivent s'afficher en dehors de
// l'élément racine de votre application.

// en utilisant des composants de type fonction, nous avons le code ci apres:

function MyPortal({ children }) {
  const el = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
}

function App() {
  return (
    <div>
      <h1>Mon Application React</h1>
      <MyPortal>
        <p>Ceci est rendu en dehors de l'arborescence DOM principale.</p>
      </MyPortal>
    </div>
  );
}

// en utilisant des composants de types class, nous avons le code ci dessous
// class MyPortal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.el = document.createElement("div");
//   }

//   componentDidMount() {
//     document.body.appendChild(this.el);
//   }

//   componentWillUnmount() {
//     document.body.removeChild(this.el);
//   }

//   render() {
//     return ReactDOM.createPortal(this.props.children, this.el);
//   }
// }

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Mon Application React</h1>
//         <MyPortal>
//           <p>Ceci est rendu en dehors de l'arborescence DOM principale.</p>
//         </MyPortal>
//       </div>
//     );
//   }
// }

ReactDOM.render(<App />, document.getElementById("app"));
