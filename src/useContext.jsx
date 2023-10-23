import { useCallback, useContext, useState, useMemo, Children } from "react";
import React from "react";
import { render } from "react-dom";

// le but du useContext est de transmettre des proprietes du fils au
//  pere sans passer par des props

const FormContext = React.createContext({});

function FormWithContext({ defaultValue, onSubmit, children }) {
  const [data, setData] = useState(defaultValue);
  const change = useCallback(function (name, value) {
    setData((d) => ({ ...d, [name]: value }));
  });

  const value = useMemo(
    function () {
      return { ...data, change };
    },
    [data, change]
  );

  const handleSubmit = useCallback(
    function (e) {
      e.preventDefault();
      onSubmit(value);
    },
    [onSubmit, value]
  );

  return (
    <FormContext.Provider value={value}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
}

function FormField({ name, children }) {
  const data = useContext(FormContext);
  const handleChange = useCallback(
    function (e) {
      data.change(e.target.name, e.target.value);
    },
    [data.change]
  );

  return (
    <div className="form-group">
      <label htmlFor={name}>{children}</label>
      <input
        value={data[name] || ""}
        onChange={handleChange}
        type="text"
        name={name}
        id={name}
        className="form-control"
      />
    </div>
  );
}

function PrimaryButton({ children }) {
  return <button className="btn btn-primary">{children}</button>;
}

function App() {
  const handleSubmit = useCallback((value) => {
    console.log(value);
  });

  return (
    <div className="container">
      <FormWithContext
        defaultValue={{ name: "Doe", firstName: "john" }}
        onSubmit={handleSubmit}
      >
        <FormField name="firstName">prenom</FormField>
        <FormField name="name">Nom</FormField>
        <PrimaryButton>envoyer</PrimaryButton>
      </FormWithContext>
    </div>
  );
}

render(<App />, document.getElementById("app"));

//ci-dessous est une premier pratique utilise dans les 20 premiere minutes de la video 23 de grafikart sur le hook useContext
// const THEMES = {
//   dark: {
//     background: "#000",
//     color: "#fff",
//     border: "solid 1px #fff",
//   },
//   light: {
//     background: "#fff",
//     color: "#000",
//     border: "solid 1px #000",
//   },
// };

// const ThemeContext = React.createContext({
//   theme: THEMES.dark,
//   toggletheme: () => {},
// });

// function SearchForm() {
//   return (
//     <div>
//       <input />
//       <ThemeButtonClass>rechercher</ThemeButtonClass>
//     </div>
//   );
// }

// function Toolbar() {
//   return (
//     <div>
//       <SearchForm />
//       <ThemeButton>m'inscrire</ThemeButton>
//     </div>
//   );
// }
// function ThemeButton({ children }) {
//   const { theme } = useContext(ThemeContext);
//   return (
//     <button style={theme}>{children}</button>

//   );
// }

// class ThemeButtonClass extends React.Component {
//   render() {
//     const { children } = this.props;
//     const { theme } = this.context;
//     return (
//       <button style={theme}>{children}</button>

//     );
//   }
// }

// ThemeButtonClass.contextType = ThemeContext;

// function App() {
//   const [theme, setTheme] = useState("light");
//   const toggleTheme = useCallback(function () {
//     setTheme((t) => (t === "light" ? "dark" : "light"));
//   }, []);
//   const value = useMemo(
//     function () {
//       return {
//         theme: theme === "light" ? THEMES.light : THEMES.dark,
//         toggleTheme,
//       };
//     },
//     [toggleTheme, theme]
//   );

//   return (
//     <div>
//       <ThemeContext.Provider value={value}>
//         <Toolbar />
//         <ThemeSwitcher />
//       </ThemeContext.Provider>
//     </div>
//   );
// }

// function ThemeSwitcher() {
//   const { toggleTheme } = useContext(ThemeContext);
//   return <button onClick={toggleTheme}>changer Theme</button>;
// }

// render(<App />, document.getElementById("app"));
