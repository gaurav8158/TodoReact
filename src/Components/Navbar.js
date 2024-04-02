import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
 import {searchTodo} from "../Components/Redux/Todoslice"


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");

useEffect(() => {
    dispatch(searchTodo(searchData));
  }, [searchData]);

  const todotask = useSelector((state) => state.app.todo);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "white", color: "black" }}>
          <div className="logo">
            <a href="/"><img
              className="app-logo"
              src="https://img.freepik.com/premium-vector/document-3d-icon-todo-list-clipboard-with-pen-3d-realistic-design-element_363543-573.jpg?w=740"
            /></a>
            <span className="logo-name">
            TaskBuddy
            </span>
          
          </div>

          <Search value={searchData} onChange={(e) => setSearchData(e.target.value)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Typography
            variant="h10"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {`ALL TASK (${todotask.length})`}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;




{/* <Typography
variant="h6"
noWrap
component="div"
sx={{ display: { xs: "none", sm: "block" } }}
>
TaskBuddy
</Typography> */}
