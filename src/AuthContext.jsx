
import React, { createContext, useState, useContext } from "react";

// 1. 공용 저장소(Context) 생성
const AuthContext = createContext();

// 2. 저장소를 관리할 공급자(Provider) 만들기
export const AuthProvider = ({ children }) => {
    const [loginTry, setLoginTry] = useState(false); // 전역 로그인 상태

    return (
        <AuthContext.Provider value={{ loginTry, setLoginTry }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. 다른 파일에서 이 데이터를 꺼내 쓰는 함수(Hook)
export const useAuth = () => useContext(AuthContext);