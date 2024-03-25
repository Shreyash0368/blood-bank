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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/donor/userSlice";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/donor/profile");
  };

  const handleDonations = () => {
    setAnchorEl(null);
    navigate("/donor/donations");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("bloodBankAuth");
    navigate("/");
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

          <div>
            {localStorage.getItem("bloodBankAuth") ? (
              <>
                <Button onClick={handleLogout} style={{ color: "white" }}>
                  Logout
                </Button>                
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
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate("/staffLogin");
                  }}
                  style={{ color: "white" }}
                >
                  Staff Login
                </Button>

                <Button
                  onClick={() => {
                    navigate("/donorLogin");
                  }}
                  style={{ color: "white" }}
                >
                  Donor Login
                </Button>
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
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleDonations}>My Donations</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
