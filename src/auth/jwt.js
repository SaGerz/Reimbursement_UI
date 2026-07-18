import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    if(!token) return true;
    
    try {
        const tokenDecoded = jwtDecode(token);
        const now = Date.now() / 1000;

        return tokenDecoded.exp < now;
    } catch (error) {
        return true;
    }
}