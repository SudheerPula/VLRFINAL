import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import { routes } from "../../routes";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    "& .MuiAppBar-colorPrimary": {
      background: "-webkit-linear-gradient(right, #c4e0e5, #4ca1af)"
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const NavBar = () => {
  const { userData, authenticated } = useSelector((state) => state.login);
  const history = useHistory();
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.clear();
    history.push(routes.LOGIN);
    window.location.reload();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link className="navbar-brand" to="/profile">
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
        <div>
              {" "}
              <center>
                <h2 className="text-center" style={{fontStyle:"italic",fontFamily:"roboto"}}>VLR, LLC</h2>{" "}
              </center>
            </div>
          {/* <Link className="navbar-brand" to="/inventory">
            <img src="images/logo.png" style={{width: '25%',marginLeft: '-2%'}} className="imgSize" alt="" />
          </Link> */}
          <div className={classes.grow} />
          {authenticated ? (
            <div className={classes.sectionDesktop}>
              <p className="welcomeTitle">Welcome: {userData.userName}</p>
              {userData.admin ? <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Link
                  style={{ color: "#fff", textDecoration: "none" }}
                  className="adminText"
                  to="/admin"
                >
                  Admin
                </Link>
              </IconButton> : null}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  style={{ backgroundColor: `#${randomColor}` }}
                  className={classes.orange}
                >
                  {userData.userName[0]}
                </Avatar>
              </IconButton>
            </div>
          ) : (
            <div>
              {" "}
              <center>
                <h2 className="text-center" style={{fontStyle:"italic",fontFamily:"roboto"}}>Welcome to VLR, LLC</h2>{" "}
              </center>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default withRouter(NavBar);
