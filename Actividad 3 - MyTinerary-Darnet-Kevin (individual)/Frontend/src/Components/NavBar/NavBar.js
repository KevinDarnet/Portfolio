import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link as LinkRouter } from "react-router-dom";
import Logomytinerary from "../Assests/Logomytinerary.png";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userActions from "../Redux/actions/userActions";
import "../Styles/styles.css";

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  function SignOut() {
    props.SignOutUser(props.user.email);
  }
  /*   console.log(props);
   */ return (
    <>
      <AppBar className="Navcolor" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <img className="logo" src={Logomytinerary} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <LinkRouter to="" className="linkresp">
                      Home
                    </LinkRouter>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <LinkRouter to="/Cities" className="linkresp">
                      Cities
                    </LinkRouter>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <img className="logo" src={Logomytinerary} />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <LinkRouter to="" className="linkresp">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Home
                </Button>
              </LinkRouter>
              <LinkRouter to="/Cities" className="linkresp">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Cities
                </Button>
              </LinkRouter>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                {props.user ? (
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={props.user.picture} />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="" />
                  </IconButton>
                )}
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {props.user ? (
                  <div>
                    <LinkRouter to="/login" className="linkresp">
                      <MenuItem onClick={SignOut}>
                        <Typography textAlign="center">Log Out</Typography>
                      </MenuItem>
                    </LinkRouter>
                  </div>
                ) : (
                  <div>
                    <LinkRouter to="/login" className="linkresp">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Log In</Typography>
                      </MenuItem>
                    </LinkRouter>
                    <LinkRouter to="/signup" className="linkresp">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Sign Up</Typography>
                      </MenuItem>
                    </LinkRouter>
                  </div>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
const mapDispatchToProps = {
  SignOutUser: userActions.SignOutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
