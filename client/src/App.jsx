import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Header } from "./components";
import Routes from "./routes/Routes";
import { ThemeContext } from "./context/ThemeContext";
import { useEffect, useState } from "react";

//to remove a cache warning
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const apolloClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("dark_theme");
    return savedTheme === "true";
  });

  useEffect(() => {
    // initially it stores false as the value for dark_theme cause there is no value to stricty check,
    localStorage.setItem("dark_theme", isDarkTheme);
  }, [isDarkTheme]);

  const values = {
    theme: isDarkTheme,
    setTheme: setIsDarkTheme,
  };

  return (
    <ThemeContext.Provider value={values}>
      <div id={isDarkTheme ? "dark" : ""}>
        <ApolloProvider client={apolloClient}>
          <Header />
          <div className="container ">
            <Routes />
          </div>
        </ApolloProvider>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
