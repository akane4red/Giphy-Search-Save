import React from "react";
import Gif from "./Gif";
import { Grid } from "@mantine/core";

const GifList = (props) => {
  const results = props.data;
  let gifs;
  if (results.length > 0) {
    gifs = results.map((gif) => (
      <Grid.Col span={3} key={gif.id}>
        <Gif
          url={gif.images.fixed_height.url}
          id={gif.id}
          isSearch={props.isSearch}
          resetClicked={props.resetClicked} 
          isInteractive={props.isInteractive}
        />
      </Grid.Col>
    ));
  }

  return (
    <div>
      <Grid columns={15}>{gifs}</Grid>
    </div>
  );
};

export default GifList;
