import { gql } from "@apollo/client";

export const QUERY_USER = gql`
query me($username: String!) {
  me(username: $username) {
    username
    email
    savedBooks {
      authors
      title
      image
      link
      description
    }
  }
}
`;

export const MUTATION_CREATE_USER = gql`
mutation createUser($username: String! $email: String! $password: String!) {
  createUser(username: $username email: $email password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const MUTATION_SAVE_BOOK = gql`
mutation saveBook($username: String!, $book: saveBook!) {
  saveBook(username: $username, book: $book) {
     username
    savedbooks {
      title
    }
  }
}
`;


export const MUTATION_LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const MUTATION_DELETE_BOOK = gql`
mutation deleteBook ($user: currentUser! $bookId: ID!) {
  deleteBook(user: $user bookId: $bookId) {
  	username
  }
}
`;

export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
