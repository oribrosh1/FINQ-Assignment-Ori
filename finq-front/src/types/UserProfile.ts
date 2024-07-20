// Definition for Name
export interface Name {
    title: string;
    first: string;
    last: string;
}

// Definition for Location
export interface Location {
    street: {
        number: number;
        name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    timezone: {
        offset: string;
        description: string;
    };
}

// Definition for Login
export interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

// Definition for DateOfBirth and Registered
export interface DateOfBirth {
    date: string;
    age: number;
}

// Definition for Picture
export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

// Definition for User
export interface User {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: DateOfBirth;
    registered: DateOfBirth;
    phone: string;
    cell: string;
    id: {
        name: string;
        value?: string;
    };
    picture: Picture;
    nat: string; // Nationality
}

// Definition for the API response
export interface RandomUserResponse {
    results: User[];
    info: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
}

export interface UserFormValues {
    title: string | undefined;
    first: string | undefined;
    last: string | undefined;
    gender: string | undefined;
    age: number | undefined;
    birthYear: number | undefined;
    streetName: string | undefined;
    streetNumber: number | undefined;
    city: string | undefined;
    state: string | undefined;
    email: string | undefined;
    phone: string | undefined;
}