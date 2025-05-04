import React, { useContext, useState, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import loginContext from '../../store/login-context';
import classes from "./Header.module.css";
import { logoutService } from '../../api/MemberService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoIosArrowForward } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";

const Header = () => {

  const loginCtx = useContext(loginContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const logoutResponseData = await logoutService();
    if (logoutResponseData.success){
        toast.success("로그아웃에 성공하셨습니다.", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }else{
        toast.error("로그아웃에 실패하셨습니다. \n 강제로 로그아웃합니다.", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
    loginCtx.logoutUser();
    navigate('/auth');
  };

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" expand="lg" className={classes.header}>
        <Container>
          <Navbar.Brand className={classes.navbar_brand} as={Link} to="/">Safe WorkCare</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/chat">Safe Chat</Nav.Link>
              <Nav.Link as={Link} to="/me">My Page</Nav.Link>
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
