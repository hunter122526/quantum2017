# Quick Start Guide - After Firebase Removal

## For Developers

### Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Setup local MySQL database
mysql -u root -p
CREATE DATABASE quantumalphaindiadb;
CREATE USER 'quantumalphaindiadb'@'localhost' IDENTIFIED BY 'quantumalphaindiadb2026';
GRANT ALL PRIVILEGES ON quantumalphaindiadb.* TO 'quantumalphaindiadb'@'localhost';
FLUSH PRIVILEGES;
mysql -u quantumalphaindiadb -p quantumalphaindiadb < database/schema.sql

# 3. Update .env.local for local development
# DB_HOST=localhost (for local)
# JWT_SECRET=dev-secret-key

# 4. Run dev server
npm run dev
```

### Testing Authentication

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"test123",
    "name":"Test User"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"test123"
  }'

# Verify (replace TOKEN with the token from login response)
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer TOKEN"
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── signup/route.ts      (User registration)
│   │       ├── login/route.ts       (User login)
│   │       ├── logout/route.ts      (User logout)
│   │       └── verify/route.ts      (Check current user)
│   │   └── admin/
│   │       └── users/
│   │           ├── route.ts         (List users)
│   │           └── [id]/route.ts    (User details/update/delete)
│   ├── layout.tsx                    (App layout with AuthProvider)
│   ├── login/page.tsx                (Login page)
│   ├── signup/page.tsx               (Signup page)
│   └── actions.ts                    (Server actions - DB operations)
├── hooks/
│   └── use-auth.tsx                  (Auth context & hook)
├── lib/
│   ├── db.ts                         (MySQL connection pool)
│   ├── db-auth.ts                    (Auth functions)
│   ├── jwt.ts                        (JWT token management)
│   └── schema.ts                     (Type definitions)
└── components/
    └── (UI components - unchanged)

database/
├── schema.sql                         (MySQL schema)
└── README.md                          (Database documentation)
```

## Common Tasks

### Adding a New API Endpoint

1. Create file in `src/app/api/route-name/route.ts`
2. Import necessary auth/db functions
3. Verify JWT token if needed
4. Call database function
5. Return JSON response

Example:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';
import { someDbFunction } from '@/lib/db-auth';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.substring(7);
    const payload = await verifyJWT(token);
    
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await someDbFunction(payload.userId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### Using in Frontend Components

```tsx
'use client';

import { useAuth } from '@/hooks/use-auth';

export default function MyComponent() {
  const { user, login, signup, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Plan: {user?.plan}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

### Using Server Actions

```tsx
'use client';

import { updateUserAction, getUsers } from '@/app/actions';

export async function AdminPanel() {
  const users = await getUsers();
  
  const handleUpdate = async (userId: string, newName: string) => {
    await updateUserAction(userId, { name: newName });
  };

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Environment Variables

**Development (.env.local)**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=quantumalphaindiadb
DB_PASSWORD=quantumalphaindiadb2026
DB_NAME=quantumalphaindiadb

JWT_SECRET=dev-secret-key
NEXTAUTH_SECRET=dev-secret

NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Production**
```env
DB_HOST=your-server-ip
DB_PORT=3306
DB_USER=quantumalphaindiadb
DB_PASSWORD=production-secure-password
DB_NAME=quantumalphaindiadb

JWT_SECRET=production-random-secret-key
NEXTAUTH_SECRET=production-random-secret-key

NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Database Operations

### Query Users
```typescript
import { getAllUsers, getUserById, getUserByEmail } from '@/lib/db-auth';

const allUsers = await getAllUsers();
const user = await getUserById('user-id');
const userByEmail = await getUserByEmail('email@example.com');
```

### Create User
```typescript
import { createUser } from '@/lib/db-auth';

const newUser = await createUser({
  email: 'user@example.com',
  password: 'plaintext-password',
  name: 'User Name',
  role: 'user',
  plan: 'Starter'
});
```

### Update User
```typescript
import { updateUser } from '@/lib/db-auth';

await updateUser('user-id', {
  name: 'New Name',
  plan: 'Pro',
  status: 'Active'
});
```

### Delete User
```typescript
import { deleteUser } from '@/lib/db-auth';

await deleteUser('user-id');
```

### Manage Subscriptions
```typescript
import { 
  getSubscription, 
  createSubscription,
  updateSubscription,
  cancelSubscription 
} from '@/lib/db-auth';

const sub = await getSubscription('user-id');
const newSub = await createSubscription('user-id', 'Pro');
await cancelSubscription('subscription-id');
```

## Logging

All significant actions are logged in `audit_logs` table:

```typescript
import { logAuditAction } from '@/lib/db-auth';

await logAuditAction({
  userId: 'user-id',
  action: 'login',
  entityType: 'user',
  entityId: 'user-id',
  changes: { /* what changed */ },
  ipAddress: request.headers.get('x-forwarded-for')
});
```

View logs in database:
```sql
SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 50;
```

## Debugging

### Check Database Connection
```bash
mysql -h 127.0.0.1 -u quantumalphaindiadb -p
# Enter password: quantumalphaindiadb2026
# Run: SHOW TABLES;
```

### View Logs
```bash
# Development
npm run dev
# Check browser console for errors

# Production (CloudPanel)
sudo journalctl -u quantum-alpha-india -n 100
# or
pm2 logs quantum-alpha-india
```

### Test API
```bash
# Use curl, Postman, or VS Code REST Client

# Health check
curl http://localhost:3000/

# Auth test
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
```

## Important Notes

❌ **REMOVED** - No longer available:
- Firebase authentication
- Firebase Firestore
- Firebase Admin SDK
- Firebase environment variables

✅ **ADDED** - Now available:
- JWT-based authentication
- MySQL database backend
- API endpoints for all operations
- Audit logging
- Session management

⚠️ **BREAKING CHANGES**:
- Authentication flow changed
- Database structure is different
- Environment variables updated
- API endpoints now required
- No more Firebase imports

## Security Reminders

1. Never commit `.env.local` with real secrets
2. Always use HTTPS in production
3. Rotate JWT_SECRET periodically
4. Monitor audit_logs for suspicious activity
5. Use strong passwords for database users
6. Limit database access to required IPs only
7. Keep dependencies updated: `npm update`
8. Review security headers in CloudPanel

## Performance Tips

1. Use indexed queries (already set up)
2. Implement caching for user data
3. Use connection pooling (already set up)
4. Monitor slow queries: Enable MySQL slow log
5. Optimize component renders with React.memo
6. Use pagination for large data sets
7. Compress assets and enable GZIP

## Getting Help

- 📖 See `DEPLOYMENT.md` for CloudPanel setup
- 📚 See `API.md` for endpoint documentation
- 🗄️ See `database/README.md` for database info
- 🐛 Check CloudPanel logs for errors
- 💬 Review code comments in source files

## Next Steps

1. ✅ All Firebase removed
2. ✅ Database schema created
3. ✅ API endpoints implemented
4. ✅ Frontend updated to use APIs
5. ⏭️ Deploy to CloudPanel (see DEPLOYMENT.md)
6. ⏭️ Test all endpoints
7. ⏭️ Setup monitoring
8. ⏭️ Configure backups
