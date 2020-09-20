import React, { useContext, useState } from 'react';
import { Button, Dropdown, Nav } from 'react-bootstrap';
import { VscAccount } from "react-icons/vsc";
import { NavLink, withRouter } from 'react-router-dom';
import TOPMENU from '../config/TOPMENU';
import UserContext from '../context/User/UserContext';
import { logOut } from '../firebase';
import Navbar from 'react-bootstrap/Navbar'


const Navigation = ({ history }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const user = useContext(UserContext)
    const topMenuItems = TOPMENU.map(menuItem => {
        return (
            <NavLink key={menuItem.path}
                to={menuItem.path}
                className="nav-link"
                exact>
                {menuItem.displayName}</NavLink>
        )
    })

    const logoutPopover = (
        <Dropdown drop='left'>
            <Dropdown.Toggle className="logout" variant="link">

                <VscAccount className="user-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Header>{!!user && user.displayName}</Dropdown.Header>
                <Dropdown.Item>
                    <Button variant="light" size="sm" block onClick={() => {
                        logOut()
                        history.push('/')
                    }}>Log Out</Button>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );

    return (

        <Navbar collapseOnSelect  expanded={isExpanded} className={'navigation'} expand="lg" variant="dark">
            <NavLink to="/" >
                <div className="navbar-brand"><b>P</b>erfect</div>
            </NavLink>
            <Navbar.Toggle onClick={() => setIsExpanded(oldVal => !oldVal)} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onClick={() => setIsExpanded(false)}>
                    {topMenuItems}
                </Nav>
            </Navbar.Collapse>
            {!!user
                ? <>{logoutPopover}</>
                : <div className="login__signup nav-link">
                    <NavLink to='/login'>
                        <Button variant="warning" size="sm" >Login</Button>
                    </NavLink>{" "}
                    <NavLink to='/signup'>
                        <Button variant="info" size="sm" >Sign Up</Button>
                    </NavLink>
                </div>
            }
        </Navbar>
    )
};

export default withRouter(Navigation);