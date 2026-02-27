# Database Schema Setup Guide for CloudPanel phpMyAdmin

## Overview
This directory contains the SQL schema for the Quantum Alpha India trading platform database. The schema is designed to work with MySQL/MariaDB through CloudPanel's phpMyAdmin interface.

## Database Tables

### 1. `users` Table
Stores user account information and authentication credentials.
- **id**: Unique user identifier (UUID)
- **email**: User email (unique, indexed)
- **password_hash**: Bcrypt hashed password
- **name**: User full name
- **role**: User role (admin, user)
- **plan**: Active subscription plan (Starter, Pro, Expert)
- **status**: Account status (Active, Cancelled)
- **created_at**: Account creation timestamp
- **updated_at**: Last update timestamp
- **last_login**: Last login timestamp

### 2. `subscriptions` Table
Tracks user subscription information.
- **id**: Unique subscription identifier (UUID)
- **user_id**: Reference to users table
- **plan**: Subscription plan type
- **status**: Subscription status (Active, Cancelled, Inactive)
- **renewal_date**: Next renewal date
- **start_date**: Subscription start date
- **end_date**: Subscription end date

### 3. `user_sessions` Table
Manages user session tokens for authentication.
- **id**: Unique session identifier (UUID)
- **user_id**: Reference to users table
- **session_token**: JWT or session token
- **user_agent**: Client information
- **ip_address**: User's IP address
- **created_at**: Session creation time
- **last_activity**: Last activity time
- **expires_at**: Session expiration time

### 4. `audit_logs` Table
Tracks all significant actions for security and compliance.
- **id**: Unique log identifier (UUID)
- **user_id**: User who performed the action
- **action**: Action type (login, logout, update, delete, etc.)
- **entity_type**: Type of entity affected
- **entity_id**: ID of affected entity
- **changes**: JSON object with change details
- **ip_address**: IP address of action performer

## How to Import Schema into CloudPanel

### Method 1: Using phpMyAdmin Web Interface
1. Open phpMyAdmin in CloudPanel
2. Select the database (e.g., `quantumalphaindiadb`)
3. Click the "SQL" tab
4. Copy and paste the entire contents of `schema.sql`
5. Click "Go" to execute

### Method 2: Using MySQL Command Line
```bash
mysql -h 127.0.0.1 -u quantumalphaindiadb -p quantumalphaindiadb < database/schema.sql
# When prompted, enter the password: quantumalphaindiadb2026
```

### Method 3: Using CloudPanel File Manager
1. Log in to CloudPanel
2. Upload `schema.sql` to your project directory
3. Connect via SSH/Terminal and run:
   ```bash
   mysql -h 127.0.0.1 -u quantumalphaindiadb -p"quantumalphaindiadb2026" quantumalphaindiadb < database/schema.sql
   ```

## Important Notes

1. **Password Hashing**: All passwords stored in the `password_hash` column must be hashed using bcrypt (bcryptjs library in Node.js)
2. **UUID Format**: Use UUID v4 or compatible UUIDs for all ID fields
3. **Timestamps**: All timestamp fields automatically manage `created_at` and `updated_at`
4. **Character Set**: Tables use UTF-8 (utf8mb4) for full Unicode support
5. **Indexes**: Commonly queried fields are indexed for performance
6. **Foreign Keys**: Subscriptions and sessions cascade delete with user deletion
7. **Constraints**: Email addresses must be unique; only one active subscription per user

## Environment Variables Required

Update your `.env.local` file with:
```env
DATABASE_URL="mysql://quantumalphaindiadb:quantumalphaindiadb2026@127.0.0.1:3306/quantumalphaindiadb"
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=quantumalphaindiadb
DB_PASSWORD="quantumalphaindiadb2026"
DB_NAME=quantumalphaindiadb
```

## Common Tasks

### View All Users
```sql
SELECT id, email, name, plan, status, created_at FROM users;
```

### View User Subscriptions
```sql
SELECT s.*, u.email FROM subscriptions s JOIN users u ON s.user_id = u.id;
```

### Find Active Sessions
```sql
SELECT * FROM user_sessions WHERE expires_at > NOW();
```

### View Recent Audit Logs
```sql
SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 50;
```

## Support
For more information, refer to [CloudPanel Documentation](https://www.cloudpanel.io/docs/) and [MySQL Documentation](https://dev.mysql.com/doc/).
