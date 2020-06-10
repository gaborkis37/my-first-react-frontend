import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: "#ff9900"}
    } else {
        return {color: "#ffffff"}
    }
};

export const signout = (next) => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt");
    }
    next();
    return fetch("http://localhost:8080/signout", {
        method: "GET"
    })
    .then(res => {
        console.log('signout', res)
        return res.json()
    })
    .catch(err => console.log(err));
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>Sign in</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>Sign up</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" style={isActive(history, "/signup"), {cursor: "pointer", color: "#ffffff"}} onClick={() => signout(() => history.push('/'))}>Sign out</a>
            </li>
        </ul>
    </div>
);

export default withRouter(Menu);
