import React, { useEffect } from 'react';
import useUserStore from '../state/usersStore';
import UserList from '../components/UserList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const RandomUsersPage = () => {
    const fetchUsers = useUserStore(state => state.fetchUsers);
    const users = useUserStore(state => state.users);

    useEffect(() => {
        fetchUsers(10);
    }, [fetchUsers]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Random Users
            </Typography>
            <UserList users={users} />
        </Container>
    );
};

export default RandomUsersPage;
