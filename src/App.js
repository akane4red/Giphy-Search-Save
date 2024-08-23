import "@mantine/core/styles.css";
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import "./App.css";
import { Header } from "./components/Header/Header";
import SavedGifs from "./components/Saved/Saved";
import { Footer } from "./components/Footer/Footer";
import Search from "./components/Search/Search";

export const UserContext = React.createContext(null);

function App() {
  const [savedGifs, setSavedGifs] = useState([]);

  return (
    <MantineProvider forceColorScheme="dark">
      <UserContext.Provider value={{ savedGifs, setSavedGifs }}>
        <div className="App">
          <HashRouter>
            <Header />
            <main>
              <Routes>
                <Route index element={<Search />} />
                <Route path="/saved" element={<SavedGifs />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </main>
          </HashRouter>
          <Footer />
        </div>
      </UserContext.Provider>
    </MantineProvider>
  );
}

export default App;
