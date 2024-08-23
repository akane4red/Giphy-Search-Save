import { useState, useContext } from "react";
import { Center } from "@mantine/core";
import classes from "./Header.module.css";
import { Grid } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../App"; // Import the UserContext

export function Header() {
  const { savedGifs } = useContext(UserContext); // Get savedGifs from context

  const [active, setActive] = useState("/search");

  const getSavedLabel = (savedGifs) => {
    const savedCount = savedGifs.length;
    return (
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        Saved {savedCount > 0 && <span>&nbsp;({savedCount})</span>}
      </span>
    );
  };

  return (
    <Grid overflow="hidden">
      <Grid.Col span={3}>
        <h1>GIPHY Searcher</h1>
      </Grid.Col>
      <Grid.Col span={3} offset={6} className={classes.navWrap}>
        <Center>
          <NavLink
            to="/search"
            className={classes.link}
            data-active={active === "/search" || undefined}
            onClick={() => setActive("/search")}
          >
            Search
          </NavLink>
        </Center>
        <Center>
          <NavLink
            to="/saved"
            className={classes.link}
            data-active={active === "/saved" || undefined}
            onClick={() => setActive("/saved")}
          >
            {getSavedLabel(savedGifs)}
          </NavLink>
        </Center>
      </Grid.Col>
    </Grid>
  );
}
