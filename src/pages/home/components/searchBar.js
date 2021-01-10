import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar({
  setTextToSearch = () => {},
  getMovies = () => {},
}) {
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    getMovies();
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Search movies"
        inputProps={{"aria-label": "search movies"}}
        onChange={(event) => setTextToSearch(event.target.value)}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => getMovies()}
        onSubmit={() => getMovies()}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
