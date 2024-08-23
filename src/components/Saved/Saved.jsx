import React, { useContext } from "react";
import { Grid } from "@mantine/core";
import { UserContext } from "../../App";
import classes from "./Saved.module.css";

import Gif from "../List/Gif";

const SavedGifs = () => {
  const { savedGifs } = useContext(UserContext);

  return (
    <div className={classes.background}>
      <h1>Saved GIFs</h1>
      <Grid columns={15}>
        {savedGifs.length > 0 ? (
          savedGifs.map((gif) => (
            <Grid.Col span={3} key={gif.id}>
              <Gif url={gif.url} id={gif.id} isSearch={false} isInteractive={false} /> {/* Disable interaction */}
            </Grid.Col>
          ))
        ) : (
          <Grid.Col span={15}>
          <h2>No saved GIFs</h2>
          </Grid.Col>
        )}
      </Grid>
    </div>
  );
};

export default SavedGifs;
