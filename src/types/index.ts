export interface User {
    id: string;
    email: string;
    displayName: string;
    googleId?: string;
    picture?: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export class AuthError extends Error {
    constructor(
      public statusCode: number,
      message: string
    ) {
      super(message);
      this.name = 'AuthError';
    }
  }