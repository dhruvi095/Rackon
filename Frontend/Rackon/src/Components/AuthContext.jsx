import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access_token") || null
    );

    const login = (user, access, refresh) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        setUser(user);
        setAccessToken(access);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        setAccessToken(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
