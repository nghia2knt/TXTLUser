import { AppBar, Avatar, Backdrop, Box, Button, CircularProgress, Container, IconButton, makeStyles, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { MenuOutlined } from '@material-ui/icons';
import logo from "../../assets/logo512.png";

import React, { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../actions/user.action";

import './Header.scss'
const pages = ['THUÊ XE', 'LỊCH ĐẶT', 'HƯỚNG DẪN', 'GIỚI THIỆU'];
const settings = ['Thông tin cá nhân', 'Chỉnh sửa thông tin', 'Lịch sử', 'Đăng xuất'];

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ResponsiveAppBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userProfileHeader = useSelector((state) => state.user.userProfile);
  const classes = useStyles();
  const open= useSelector((state) => state.user.loading);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(actions.getUserByJWT())
    }
  }, [])


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

  const moveToPage = (page) =>{
    navigate(page);
  }

  return (
    <AppBar position="static" >
     
     
    
      <Container maxWidth="xl">
        <Toolbar disableGutters>
       
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={logo} alt="logo" onClick={() => {
                  moveToPage("/");
                }}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuOutlined />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem key="gioi-thieu" onClick={() => {
                  moveToPage("/");
                }}>
                  <Typography textAlign="center">Giới thiệu</Typography>
                </MenuItem>
                <MenuItem key="thue-xe" onClick={() => {
                  moveToPage("/cars");
                }}>
                  <Typography textAlign="center">Thuê Xe</Typography>
                </MenuItem>
                {userProfileHeader && (
                <MenuItem key="lich-dat" onClick={() => {
                  moveToPage("/calendar");
                }}>
                  <Typography textAlign="center">Lịch Đặt</Typography>
                </MenuItem>
                )}
                <MenuItem key="huong-dan" onClick={() => {
                  moveToPage("/help");
                }}>
                  <Typography textAlign="center">Hướng Dẫn</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
     
          <Backdrop className={classes.backdrop} open={open} >
            <CircularProgress color="inherit" />
          </Backdrop>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
              <Button
                variant="text"
                key="gioi-thieu"
                onClick={() => {
                  moveToPage("/");
                }}
                color="inherit"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Giới thiệu
              </Button>
              <Button
                variant="text"
                key="thue-xe"
                onClick={() => {
                  moveToPage("/cars");
                }}
                color="inherit"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Thuê Xe
              </Button>
              <Button
                variant="text"
                key="lich-dat"
                onClick={() => {
                  moveToPage("/calendar");
                }}
                color="inherit"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Lịch Đặt
              </Button>
              <Button
                variant="text"
                key="huong-dan"
                onClick={() => {
                  moveToPage("/help");
                }}
                color="inherit"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Hướng Dẫn
              </Button>
              
          </Box>
          {userProfileHeader ? (    
          <div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="thong-tin-ca-nhan" onClick={() => {
                    moveToPage('/user-profile');
                  }}>
                  <Typography textAlign="center">Thông tin cá nhân</Typography>
              </MenuItem>
              <MenuItem key="thay-doi-mat-khau" onClick={() => {
                    moveToPage('/user-profile/change-password');
                  }}>
                  <Typography textAlign="center">Thay đổi mật khẩu</Typography>
              </MenuItem>
              <MenuItem key="lich-su-thue-xe" onClick={() => {
                    moveToPage('/invoices');
                  }}>
                  <Typography textAlign="center">Lịch sử thuê xe</Typography>
              </MenuItem>
              <MenuItem key="dang-xuat" onClick={() => {
                      localStorage.setItem('jwt', '')
                      dispatch(actions.getUserByJWT())
                      moveToPage('/login');
                  }}>
                  <Typography textAlign="center">Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </Box>
          </div>
          ) : (
            <Box sx={{ flexGrow: 0 }}> 
                <Button
                    variant="text"
                    key="dang-ky"
                    onClick={() => {
                      moveToPage('/signup');
                    }}
                    color="inherit"
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Đăng ký
                </Button>
                <Button
                  variant="text"
                  key="dang-nhap"
                  onClick={() => {
                    moveToPage('/login');
                  }}
                  color="inherit"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                Đăng nhập
              </Button>
            </Box> 
           ) }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;