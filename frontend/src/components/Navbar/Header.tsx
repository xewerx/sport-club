import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Container,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import SideDrawer from "./SideDrawer";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import useStyles from "./styles";
import navLinks from "./navLinks";
import { AppState } from "../../state/types";
import { logoutAction } from "../../state/actions/user/logoutAction";

const Header: React.FC = () => {
  const classes: ClassNameMap = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.userState);

  const signoutHandler = () => {
    logoutAction(dispatch);
  };

  return (
    <AppBar className={classes.bar} position="fixed">
      <Toolbar component="nav">
        <Container className={classes.navbarDisplayFlex}>
          <Hidden smDown>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navListDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                <Link to={path} key={title} className={classes.linkText}>
                  <ListItem className="no-hover btn draw-border" button>
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
              ))}
              {user && (
                <ListItem button className="no-hover dropdown">
                  {user.avatar ? (
                    <Avatar
                      aria-label="recipe"
                      className={classes.avatar}
                      src={`data:image/png;base64,${user.avatar}`}
                    ></Avatar>
                  ) : (
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {user.username[0].toUpperCase()}
                    </Avatar>
                  )}
                  <ListItemText
                    primary={user.username}
                    className={classes.linkText}
                  />
                  <div>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/myprofile" className="fullWidth">
                          Profil
                        </Link>
                      </li>
                      <li className="last-li">
                        <Link
                          to="#signout"
                          onClick={signoutHandler}
                          className="fullWidth"
                        >
                          Wyloguj
                        </Link>
                      </li>
                    </ul>
                  </div>
                </ListItem>
              )}
            </List>
          </Hidden>
          <Hidden mdUp>
            <SideDrawer />
          </Hidden>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
