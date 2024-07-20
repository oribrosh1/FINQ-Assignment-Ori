import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationContextType {
    prevPath: string;
    setPrevPath: (path: string) => void;
}

const defaultState: NavigationContextType = {
    prevPath: "",
    setPrevPath: () => { }
};

const NavigationContext = createContext<NavigationContextType>(defaultState);

interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const [prevPath, setPrevPath] = useState<string>("");
    const location = useLocation();

    useEffect(() => {
        // Capture the current path before location changes
        const handleRouteChange = () => {
            setPrevPath(location.pathname);
        };

        // Trigger the update when the component mounts and when location changes
        handleRouteChange();

    }, [location]);

    return (
        <NavigationContext.Provider value={{ prevPath, setPrevPath }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = (): NavigationContextType => useContext(NavigationContext);
