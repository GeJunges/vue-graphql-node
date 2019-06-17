import { gql } from 'apollo-boost';

export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            _id
            userName
            email
            password
            avatar
            joinDate
            favorites {
                _id
                title
                imageUrl
            }
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_POSTS = gql`
    query {
        getPosts {
        _id
        title
        imageUrl
        description
        }
    }
`;

export const SINGIN_USER = gql`
    mutation($userName: String!, $password: String!) {
        signinUser(userName: $userName, password: $password) {
            token
        }
    }
`;

export const SINGUP_USER = gql`
    mutation($userName: String!, $email: String!, $password: String!) {
        signupUser(userName: $userName, email: $email, password: $password) {
            token
        }
    }
`;
