export const USER_API = {
    // Auth Coordination
    // Create a new user account and profile for auth-service coordination
    USERS_AUTH_COORDINATE: '/api/auth-coordination/create-user',
    // Health check endpoint for auth-service coordination
    // Get user account details by user ID for auth-service coordination
    USERS_AUTH_COORDINATE_HEALTH: '/api/auth-coordination/user/{user_id}',

    // User Endpoints
    // Users admins
    USERS_ADMINS:  '/api/auth-coordination/users/admins',
}
