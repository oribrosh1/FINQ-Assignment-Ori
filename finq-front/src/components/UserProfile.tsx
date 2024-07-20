import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import useUserStore from '../state/usersStore'; // Adjust the import path as necessary
import { UserFormValues } from '../types/UserProfile'; // Your type definitions
import { useNavigation } from '../contexts/NavigationContext';

const UserProfile = () => {
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();
  const userId = uuid as string ?? "";
  const { getUser, saveUser, updateUser, deleteUser, isUserSaved } = useUserStore();
  const user = getUser(userId);
  const { prevPath } = useNavigation();
  const isSaved = isUserSaved(userId) && !prevPath.includes('saved-users');
  console.log(isUserSaved(userId));
  console.log(prevPath);



  const defaultValues = useMemo((): UserFormValues => ({
    title: user?.name.title || '',
    first: user?.name.first || '',
    last: user?.name.last || '',
    gender: user?.gender || '',
    age: user?.dob?.age || undefined,
    birthYear: (new Date(user?.dob?.date ?? '')).getFullYear(),
    streetName: user?.location.street.name || '',
    streetNumber: user?.location.street.number || undefined,
    city: user?.location.city || '',
    state: user?.location.state || '',
    email: user?.email || '',
    phone: user?.phone || '',
  }), [user]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormValues>({
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues);  // Reset the form whenever the user data changes
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
    if (isSaved) {
      await updateUser(userId, {
        title: data?.title || '',
        first: data?.first || '',
        last: data?.last || ''
      });
    }
    else {
      await saveUser(userId, data, user?.picture?.thumbnail ?? "", user?.location?.country ?? "");
      navigate('/saved-users'); // Redirect after update
    }
  };

  const handleDelete = async () => {
    await deleteUser(userId);
    navigate('/'); // Navigate home or to the list after deletion
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        {isSaved ? 'Edit ' : 'Save '} User Profile
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="Title"
              variant="outlined"
              {...register('title', { required: 'Title is required' })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="First Name"
              variant="outlined"
              {...register('first', { required: 'First name is required', minLength: { value: 2, message: "First name must be at least 2 characters long" } })}
              error={Boolean(errors.first)}
              helperText={errors.first?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="Last Name"
              variant="outlined"
              {...register('last', { required: 'Last name is required', minLength: { value: 2, message: "Last name must be at least 2 characters long" } })}
              error={Boolean(errors.last)}
              helperText={errors.last?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="Gender"
              variant="outlined"
              {...register('gender')}
              error={Boolean(errors.gender)}
              helperText={errors.gender?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="Age"
              type="number"
              variant="outlined"
              {...register('age')}
              error={Boolean(errors.age)}
              helperText={errors.age?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="Birth Year"
              type="number"
              variant="outlined"
              {...register('birthYear')}
              error={Boolean(errors.birthYear)}
              helperText={errors.birthYear?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="Street Name"
              variant="outlined"
              {...register('streetName')}
              error={Boolean(errors.streetName)}
              helperText={errors.streetName?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="Street Number"
              type="number"
              variant="outlined"
              {...register('streetNumber')}
              error={Boolean(errors.streetNumber)}
              helperText={errors.streetNumber?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="City"
              variant="outlined"
              {...register('city')}
              error={Boolean(errors.city)}
              helperText={errors.city?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="State"
              variant="outlined"
              {...register('state')}
              error={Boolean(errors.state)}
              helperText={errors.state?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Entered value does not match email format"
                }
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              style={{ margin: 10 }}
              fullWidth
              label="Phone"
              variant="outlined"
              {...register('phone')}
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12}>
            {!isSaved && (
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            )}
            {isSaved && (
              <>
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
                <Button onClick={handleDelete} variant="contained" color="secondary">
                  Delete
                </Button>
              </>
            )}
            <Button onClick={() => navigate(-1)} variant="contained">
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfile;