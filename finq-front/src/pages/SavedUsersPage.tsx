import React, { useEffect } from 'react';
import useUserStore from '../state/usersStore';
import UserList from '../components/UserList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const SavedUsersPage = () => {
    const fetchSavedUsers = useUserStore(state => state.fetchSavedUsers);
    const savedUsers = useUserStore(state => state.savedUsers);

    useEffect(() => {
        fetchSavedUsers();
    }, [fetchSavedUsers]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Saved Users
            </Typography>
            <UserList users={savedUsers} />
        </Container>
    );
};

export default SavedUsersPage;