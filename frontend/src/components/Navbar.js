import React, { useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

export const MyNavbar = observer(({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Copygram</NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Link className="nav-link" to="/users/me">
              My Profile
            </Link>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account Management
              </DropdownToggle>

              <DropdownMenu right>
                {currentUser ? (
                  <DropdownItem>
                    <Link to="/logout">Log Out</Link>
                  </DropdownItem>
                ) : (
                  <>
                    <DropdownItem>
                      <Link to="/login">Log In</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/signup">Sign Up</Link>
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
});
