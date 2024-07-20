
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './contexts/NavigationContext';
import HomePage from './pages/HomePage';
import RandomUsersPage from './pages/RandomUsersPage';
import SavedUsersPage from './pages/SavedUsersPage';
import ProfilePage from './pages/ProfilePage';
import { CssBaseline, Container } from '@mui/material';

const App = () => {
    return (
        <Router>
            <NavigationProvider>
                <CssBaseline />
                <Container>
                    <Routes>
                        <Route path="/" element={<HomePage />} />  {/* screen 0 */}
                        <Route path="/users" element={<RandomUsersPage />} /> {/* screen 1 */}
                        <Route path="/saved-users" element={<SavedUsersPage />} /> {/* screen 2 */}
                        <Route path="/user-profile/:uuid" element={<ProfilePage />} /> {/* screen 3 */}
                    </Routes>
                </Container>
            </NavigationProvider>
        </Router>
    );
};

export default App;