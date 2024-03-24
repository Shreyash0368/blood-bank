import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ padding: "0 10px" }}>
      <AppBar
        position="static"
        style={{
          borderRadius: "10px",
          marginTop: "1rem",
          backgroundColor: "#A0153E",
        }}
      >
        <Toolbar>
          <Link to="/" style={{ color: "white" }}>
            Home
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BloodBank
          </Typography>
          {auth && (
            <div>
              {localStorage.getItem("bloodBankAuth") ? (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              ) : (
                <>
                  <Link to={'/staffLogin'}> <Button style={{ color: "white" }}>Staff Login</Button> </Link>
                  <Link to={'/donorLogin'} > <Button style={{ color: "white" }}>Donor Login</Button> </Link>
                </>
              )}

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Donations</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
