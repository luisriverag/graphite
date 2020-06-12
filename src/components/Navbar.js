import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import LangSelector from "./LangSelector";
const blankAvatar = require("../assets/img/blank_avatar.png");
const langSupport = require("../utils/languageSupport.json");

const Navbar = ({
  auth: { user },
  logout,
  lang,
  orgs: { organizations, selectedOrg },
}) => {
  const { avatar } = user;

  const [userAvatar, setAvatar] = useState(blankAvatar);
  const [menuState, setMenuState] = useState(false);

  useEffect(() => {
    //  Check if user has avatar and set avatar state appropriately
    if (avatar) {
      setAvatar(avatar);
    } else {
      setAvatar(blankAvatar);
    }
    //eslint-disable-next-line
  }, [user]);

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  return (
    <nav className="navigation">
      <section>
        <Link className="navigation-title" to="/" title="Graphite Docs">
          <img
            className="brand-logo"
            src={require("../assets/img/logo_mark.svg")}
            alt="graphite mark"
          />
        </Link>
        <ul className="navigation-list float-right">
          <li className="navigation-item lang-selector">
            <LangSelector />
          </li>
          <li className="navigation-item">
            <button onClick={toggleMenu} className="not-button no-underline">
              <img
                src={userAvatar}
                alt="user profile avatar"
                className="avatar"
              />
            </button>
            <div
              style={{ display: menuState ? "block" : "none" }}
              className="menu-drop global-menu"
              id="nav-drop"
            >
              <ul>
                {organizations.length > 1 && selectedOrg.name && (
                  <span>
                    <li>
                      <Link to="/org-selection" className="not-button no-underline">
                        {selectedOrg.name}
                        <i className="left-5 fas fa-exchange-alt"></i>
                      </Link>                      
                    </li>
                    <li className="divider" />
                  </span>
                )}
                <li>
                  <Link className="not-button no-underline" to="/profile">
                    {langSupport[lang].profile}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="not-button no-underline btn-left"
                  >
                    {langSupport[lang].nav_settings}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/billing"
                    className="not-button no-underline btn-left"
                  >
                    {langSupport[lang].nav_billing}
                  </Link>
                </li>
                <li className="divider" />
                <li>
                  <button
                    onClick={logout}
                    className="not-button no-underline btn-left"
                  >
                    {langSupport[lang].log_out}
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  orgs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lang: state.lang,
  orgs: state.orgs,
});

export default connect(mapStateToProps, { logout })(Navbar);