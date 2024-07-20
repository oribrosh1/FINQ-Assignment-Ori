import React from 'react';
import { User } from '../types/UserProfile';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const UserList = ({ users }: { users: User[] }) => {
    const navigate = useNavigate();

    const handleListItemClick = (uuid: string) => {
        navigate(`/user-profile/${uuid}`);
    };

    return (
        <List>
            {users?.map(user => (
                <ListItem button key={user.login.uuid} onClick={() => handleListItemClick(user.login.uuid)}>
                    <ListItemAvatar>
                        <Avatar alt={`${user.name.first} ${user.name.last}`} src={user.picture.thumbnail} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${user.name.title} ${user.name.first} ${user.name.last}`}
                        secondary={
                            <>
                                <Typography component="span" variant="body2" color="text.primary">
                                    {user.gender}, {user.location.country}
                                </Typography>
                                — {user.email}, {user.phone}
                            </>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default UserList;
