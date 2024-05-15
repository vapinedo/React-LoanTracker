import React, { ReactNode } from "react";
import useAuth from "@services/useAuth";
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute(props: PrivateRouteProps): React.ReactElement<any, any> | null {
    const { children } = props;
    const { isUserLoggedIn } = useAuth();

    if (isUserLoggedIn) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" />; 
    }
};