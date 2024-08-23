import React, { Component } from "react";
import {
  TextInput,
  ActionIcon,
  Button,
  rem,
  Center,
  Loader,
} from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import classes from "./Search.module.css";
import GifList from "../List/List";

class Search extends Component {
  apiKey = "API_KEY_GOES_HERE"

  state = {
    gifs: [],
    value: "",
    resetClicked: false,
    offset: 0,
    loading: false,
  };

  componentDidMount() {
    this.setState({ value: "hello" }, () => this.doSearch(this.state.value));
  }

  doSearch = (term, append = false) => {
    this.setState({ loading: true });
    const { offset, gifs } = this.state;
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${term}&offset=${offset}&limit=20&api_key=${this.apiKey}`
      )
      .then(({ data }) =>
        this.setState((prevState) => ({
          gifs: append ? [...gifs, ...data.data] : data.data,
          resetClicked: !prevState.resetClicked,
        }))
      )
      .catch((e) => console.error(e))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearch = () => {
    if (this.state.value.trim() !== "") {
      this.setState({ gifs: [], offset: 0 }, () =>
        this.doSearch(this.state.value)
      );
    }
  };

  handleSeeMore = () => {
    this.setState(
      (prevState) => ({ offset: prevState.offset + 20 }),
      () => this.doSearch(this.state.value, true)
    );
  };

  render() {
    let noResultFound = !this.state.loading && this.state.gifs.length === 0;
    let resultFound = !this.state.loading && this.state.gifs.length > 0;

    return (
      <div className={classes.background}>
        <Center>
          <TextInput
            radius="xl"
            size="xl"
            value={this.state.value}
            onChange={(event) =>
              this.setState({ value: event.currentTarget.value })
            }
            placeholder="Search"
            rightSectionWidth={70}
            leftSection={
              <CiSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            rightSection={
              <ActionIcon
                size={46}
                radius="xl"
                variant="filled"
                onClick={this.handleSearch}
              >
                <FaArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
          />
        </Center>
        <div style={{ marginTop: "25px" }}>
          {this.state.loading && <Loader size="xl" />}
          {resultFound && <h1>Result</h1>}
          <GifList
            data={this.state.gifs}
            isSearch={true}
            resetClicked={this.state.resetClicked}
            isInteractive={true}
          />
          {this.state.gifs.length > 0 && (
            <Button
              style={{ marginTop: "25px" }}
              variant="outline"
              size="xl"
              radius="xl"
              onClick={this.handleSeeMore}
            >
              See more
            </Button>
          )}
          {noResultFound && <h1>No Result found</h1>}
        </div>
      </div>
    );
  }
}

export default Search;
