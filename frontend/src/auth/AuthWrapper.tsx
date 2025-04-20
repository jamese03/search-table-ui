import {useEffect, useState} from "react";
import {checkAuth, loginWithGoogle, logout} from "../lib/api.ts";

const AuthWrapper = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const handleLogin = () => {
        loginWithGoogle();
    };

    const handleLogout = async () => {
        await logout();
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authenticated = await checkAuth();
                setIsAuthenticated(authenticated);
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsAuthenticated(false);
            }
        };
        checkAuthentication();
    }, []);

    if(isAuthenticated == null) {
        return (<div> checking if logged in</div>)
    }

    if (!isAuthenticated) {
        return (
            <div>
                <p>Please log in to access the table.</p>
                <button onClick={handleLogin}>Login with Google</button>
            </div>
        )
    }

    return (
        <div>
            {props.children}
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
export default AuthWrapper;
