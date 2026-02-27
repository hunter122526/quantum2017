# API Documentation

## Authentication Endpoints

### Sign Up
**POST** `/api/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "name": "User Name"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user",
    "plan": "Starter",
    "status": "Active"
  },
  "token": "jwt-token-string"
}
```

**Error Responses:**
- 400: Missing required fields
- 409: Email already exists
- 500: Internal server error

---

### Login
**POST** `/api/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user",
    "plan": "Starter",
    "status": "Active"
  },
  "token": "jwt-token-string"
}
```

**Error Responses:**
- 400: Missing email or password
- 401: Invalid credentials
- 403: Account cancelled
- 500: Internal server error

---

### Verify Token / Get Current User
**GET** `/api/auth/verify`

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user",
    "plan": "Starter",
    "status": "Active",
    "subscription": {
      "id": "subscription-id",
      "plan": "Starter",
      "status": "Active",
      "renewal_date": "2025-03-27T00:00:00Z"
    }
  }
}
```

**Error Responses:**
- 401: Invalid or expired token
- 404: User not found
- 500: Internal server error

---

### Logout
**POST** `/api/auth/logout`

Invalidate user session.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**Error Responses:**
- 401: Invalid token
- 500: Internal server error

---

## Admin Endpoints

All admin endpoints require `Authorization` header with a valid JWT token for an admin user.

```
Authorization: Bearer <admin-jwt-token>
```

### Get All Users
**GET** `/api/admin/users`

Retrieve all users in the system (admin only).

**Response (200 OK):**
```json
{
  "users": [
    {
      "id": "uuid-string",
      "email": "user@example.com",
      "name": "User Name",
      "role": "user",
      "plan": "Starter",
      "status": "Active"
    }
  ]
}
```

**Error Responses:**
- 401: Missing or invalid token
- 403: Insufficient permissions (not admin)
- 500: Internal server error

---

### Get User Details
**GET** `/api/admin/users/{id}`

Get details of a specific user.

**URL Parameters:**
- `id` (string): User ID (UUID)

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user",
    "plan": "Starter",
    "status": "Active"
  }
}
```

**Error Responses:**
- 401: Missing or invalid token
- 403: Insufficient permissions
- 404: User not found
- 500: Internal server error

---

### Update User
**PUT** `/api/admin/users/{id}`

Update user information (admin only).

**URL Parameters:**
- `id` (string): User ID (UUID)

**Request Body (all fields optional):**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "plan": "Pro",
  "status": "Active"
}
```

**Response (200 OK):**
```json
{
  "message": "User updated successfully"
}
```

**Error Responses:**
- 400: Invalid request
- 401: Missing or invalid token
- 403: Insufficient permissions
- 404: User not found
- 500: Internal server error

---

### Delete User
**DELETE** `/api/admin/users/{id}`

Delete a user account (admin only).

**URL Parameters:**
- `id` (string): User ID (UUID)

**Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**
- 401: Missing or invalid token
- 403: Insufficient permissions or attempting self-deletion
- 404: User not found
- 500: Internal server error

---

## Subscription Endpoints

(To be implemented in future)

---

## Error Handling

All endpoints follow standard HTTP status codes:

| Status | Meaning |
|--------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Missing or invalid authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource conflict (e.g., duplicate email) |
| 500 | Internal Server Error - Server error |

**Error Response Format:**
```json
{
  "error": "Error description message"
}
```

---

## Authentication

### JWT Token Structure

Tokens expire after 1 hour. Include in all authenticated requests:

```
Authorization: Bearer <token>
```

### Token Payload
```json
{
  "userId": "user-id-uuid",
  "email": "user@example.com",
  "role": "user|admin",
  "iat": 1234567890,
  "exp": 1234571490
}
```

### Refreshing Tokens

When a token expires, users must log in again. Future implementation will support refresh tokens.

---

## Rate Limiting

(To be implemented)

---

## Examples

### Sign Up Example
```bash
curl -X POST https://your-domain.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123!",
    "name": "John Doe"
  }'
```

### Login Example
```bash
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123!"
  }'
```

### Get Current User Example
```bash
curl -X GET https://your-domain.com/api/auth/verify \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Admin: Get All Users
```bash
curl -X GET https://your-domain.com/api/admin/users \
  -H "Authorization: Bearer <admin-jwt-token>"
```

### Admin: Update User
```bash
curl -X PUT https://your-domain.com/api/admin/users/user-id \
  -H "Authorization: Bearer <admin-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "plan": "Pro",
    "status": "Active"
  }'
```

---

## Security Notes

1. **Always use HTTPS** in production
2. **Never expose JWT tokens** in client-side code
3. **Store tokens securely** (httpOnly cookies recommended)
4. **Validate all inputs** on the client and server
5. **Use CORS** to restrict API access
6. **Log all sensitive operations** for audit trail
7. **Rotate JWT_SECRET** periodically
8. **Monitor failed login attempts** for suspicious activity

---

## Support

For issues or questions, contact the development team or consult the [main README](./README.md).
