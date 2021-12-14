import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../InvestoFoxLogo.svg';
import profileIcon from '../IFicon.png';
import './NavBar.css';
import { Modal, Box, Typography, Button } from '@mui/material';

const NavBar = ({title, children}) => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };




    return(
        <div className="page">
            <div className="leftBar">
                <div className="topHalf">
                    <Link to="./chart">
                        <img src={logo} alt="InvestoFox logo" className="logo" />
                    </Link>
                    <div className="navBarButtonsDiv">
                        <Link to="./stock-api">
                            <button className="navBarButton">Stock fetch</button>
                        </Link>
                        <Link to="./add-order">
                            <button className="navBarButton">Add order</button>
                        </Link>
                        <Link to="./orders">
                            <button className="navBarButton">Orders</button>
                        </Link>
                        <Link to="./chart">
                            <button className="navBarButton">Chart</button>
                        </Link>
                    </div>
                </div>
                <div className="bottomHalf">
                    <Link to="./settings">
                        <button className="settingsButton">Settings</button>
                    </Link>
                    <p className="message">Made with ♡ by the InvestoFox team</p>
                </div>
            </div>
            <div className="temp">
                <div className="topBar">
                    <div className="titleContainer">
                        <p className="currentPageTitle">{title}</p>
                    </div>
                    <div className="userProfileContainer">
                    <Button onClick={handleShow}>
                            <img src={profileIcon} className="profileIcon" alt="user icon" />
                        </Button>
                        <Modal
                            open={show}
                            onClose={handleClose}
                            sx={style}
                        >
                            <Box sx={{width: 100, height: 100}}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Logout
                            </Typography>
                            <Button>Logout</Button>
                            <Button onClick={handleClose}>Close</Button>
                            </Box>
                        </Modal>
                    </div>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default NavBar;
