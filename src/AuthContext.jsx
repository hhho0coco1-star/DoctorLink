
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loginTry, setLoginTry] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    // ✅ 새로고침 시 로그인 복구
    useEffect(() => {
        const savedLogin = localStorage.getItem("doctorlink_login");

        if (savedLogin) {
            const parsed = JSON.parse(savedLogin);
            setLoginTry(true);
            setUserInfo(parsed);
        }
    }, []);

    // ✅ 로그아웃 처리
    const logout = () => {
        localStorage.removeItem("doctorlink_login");
        setLoginTry(false);
        setUserInfo(null);
    };

    return (
        <AuthContext.Provider
            value={{
                loginTry,
                setLoginTry,
                userInfo,
                setUserInfo,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}