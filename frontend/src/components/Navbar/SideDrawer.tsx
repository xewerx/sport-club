import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import useStyles from "./styles";
import navLinks from "./navLinks";
import { AppState } from "../../state/types";
import { logoutAction } from "../../state/actions/user/logoutAction";

const SideDrawer: React.FC = () => {
  const classes: ClassNameMap = useStyles();
  const [stateMobileNav, setStateMobileNav] = useState(false);

  const { user } = useSelector((state: AppState) => state.userState);

  const toggleDrawer = (stateMobileNav: boolean) => () => {
    setStateMobileNav(stateMobileNav);
  };

  const dispatch = useDispatch();
  const signoutHandler = () => {
    logoutAction(dispatch);
  };

  const sideDrawerList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List component="nav">
        {navLinks.map(({ title, path }) => (
          <Link to={path} key={title} className={classes.linkTextGreen}>
            <ListItem button>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
        {user ? (
          <>
            <Link to={"/myprofile"} className={classes.linkTextGreen}>
              <ListItem button>
                <ListItemText primary="Profil" />
              </ListItem>
            </Link>
            <Link
              to={"#signout"}
              onClick={signoutHandler}
              className={classes.linkTextGreen}
            >
              <ListItem button>
                <ListItemText primary="Wyloguj" />
              </ListItem>
            </Link>
          </>
        ) : (
          <Link to={"/signin"} className={classes.linkTextGreen}>
            <ListItem button>
              <ListItemText primary={"Zaloguj się"} />
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
        <Menu fontSize="large" style={{ color: `white` }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={stateMobileNav}
        onClose={toggleDrawer(false)}
      >
        {sideDrawerList()}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
