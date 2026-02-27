# Troubleshooting Guide

## Database Connection Issues

### ❌ "Cannot find module 'mysql2'"
**Solution**:
```bash
npm install mysql2
```

### ❌ "ECONNREFUSED 127.0.0.1:3306"
**Cause**: MySQL not running or not on correct host/port

**Check**:
```bash
# Is MySQL running?
sudo systemctl status mysql
# or
ps aux | grep mysql

# Restart if needed:
sudo systemctl restart mysql
```

**Verify credentials**:
```bash
mysql -h 127.0.0.1 -u quantumalphaindiadb -p
# Password: quantumalphaindiadb2026
```

### ❌ "Access denied for user 'quantumalphaindiadb'@'127.0.0.1'"
**Solution**:
1. Reset user in CloudPanel (MySQL → Users)
2. Or manually:
```bash
mysql -u root -p
DROP USER 'quantumalphaindiadb'@'127.0.0.1';
CREATE USER 'quantumalphaindiadb'@'127.0.0.1' IDENTIFIED BY 'quantumalphaindiadb2026';
GRANT ALL ON quantumalphaindiadb.* TO 'quantumalphaindiadb'@'127.0.0.1';
FLUSH PRIVILEGES;
```

### ❌ "Database 'quantumalphaindiadb' doesn't exist"
**Solution**:
1. Create database in phpMyAdmin, or
2. Run:
```bash
mysql -u quantumalphaindiadb -p quantumalphaindiadb < database/schema.sql
```

---

## Authentication Issues

### ❌ "Invalid token" error
**Cause**: JWT_SECRET mismatch between token creation and verification

**Solution**:
- Ensure JWT_SECRET is same in `.env.local`
- Check if token was generated with same secret
- Clear browser cache and localStorage
- Log in again to get new token

### ❌ "Unauthorized" on protected routes
**Check**:
```bash
# Verify token format:
# It should start with: Authorization: Bearer <token>

# Check token expiration:
# Tokens expire after 1 hour by default

# Test with curl:
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### ❌ Login endpoint returns 401
**Possible causes**:
1. Wrong email/password
2. User account status is "Cancelled"
3. User doesn't exist

**Debug**:
```bash
# Check user exists:
mysql -u quantumalphaindiadb -p quantumalphaindiadb
SELECT * FROM users WHERE email='test@example.com';
```

### ❌ "Email already exists" on signup
**Solution**: Choose a different email, or delete the account:
```bash
mysql -u quantumalphaindiadb -p quantumalphaindiadb
DELETE FROM users WHERE email='existing@email.com';
```

### ❌ "Firebase is not configured" error
This should not happen anymore since Firebase is removed. If you see this:
- Clear browser cache
- Restart dev server
- Check that `src/lib/firebase.ts` was deleted

---

## API Endpoint Issues

### ❌ "404 Not Found" on API endpoints
**Check**:
1. Is dev server running? `npm run dev`
2. Is path correct?
3. Is method correct? (POST vs GET, etc)
4. Check spelling of endpoint

### ❌ "Method Not Allowed" when calling endpoint
**Cause**: Wrong HTTP method

**Fix**:
- Signup: `POST /api/auth/signup`
- Login: `POST /api/auth/login`
- Verify: `GET /api/auth/verify`
- Logout: `POST /api/auth/logout`
- Get users: `GET /api/admin/users`
- Update user: `PUT /api/admin/users/{id}`
- Delete user: `DELETE /api/admin/users/{id}`

### ❌ "Missing required fields"
**Solution**: Check request body format:
```bash
# ✅ Correct:
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123","name":"Test"}'

# ❌ Wrong - missing Content-Type header
curl -X POST http://localhost:3000/api/auth/signup \
  -d '{"email":"test@test.com","password":"pass123","name":"Test"}'
```

---

## Frontend/Component Issues

### ❌ useAuth Hook errors
**Error**: "useAuth must be used within an AuthProvider"

**Fix**: Ensure AuthProvider wraps your components:
```tsx
// src/app/layout.tsx
<AuthProvider>
  {children}
</AuthProvider>
```

### ❌ Unable to read property 'email' of null
**Cause**: Trying to access user data before auth check

**Fix**:
```tsx
const { user, loading } = useAuth();

if (loading) return <div>Loading...</div>;
if (!user) return <div>Please log in</div>;

// Now safely use user
return <h1>{user.email}</h1>;
```

### ❌ Token not persisting across page reload
**Check**:
1. Is `localStorage.setItem('authToken', token)` being called?
2. Is token being read in useEffect on mount?
3. Check browser cache/storage settings

**Test**:
```javascript
// In browser console
localStorage.getItem('authToken')  // Should show token
```

---

## Deployment Issues (CloudPanel)

### ❌ Application won't start
**Check logs**:
```bash
sudo journalctl -u quantum-alpha-india -n 100
# or
pm2 logs quantum-alpha-india
```

**Common causes**:
1. `.env.local` not set - Create it with correct values
2. Database not reachable - Test credentials
3. PORT already in use - Change port in CloudPanel
4. Build errors - Try: `npm run build` locally

### ❌ 502 Bad Gateway
**Cause**: Application crashed or not responding

**Fix**:
```bash
# Check status
sudo systemctl status quantum-alpha-india

# Restart
sudo systemctl restart quantum-alpha-india

# Check logs
sudo journalctl -u quantum-alpha-india -n 50
```

### ❌ Database connection timeout on production
**Check**:
1. Database host in `.env.local` is correct
2. Database user has permissions: `GRANT ALL ON db.* TO 'user'@'host'`
3. Firewall allows port 3306 (localhost only)
4. MySQL running: `sudo systemctl status mysql`

### ❌ SSL certificate issues
**Error**: "SSL_ERROR_BAD_CERT_DOMAIN"

**Fix in CloudPanel**:
1. Applications → SSL
2. Renew certificate
3. Wait 5 minutes for propagation
4. Clear browser cache and try again

---

## Performance Issues

### ⚠️ Slow login response (> 1 second)
**Cause**: Bcrypt hashing takes time (intentional for security)

**Not a problem**: This is expected (bcrypt runs in ~100ms)

**Real issues**:
1. Database query slow - Check indexes exist
2. Network latency - Expected, can't optimize
3. Server overloaded - Monitor resources

### ⚠️ Slow database queries
**Check**:
```bash
# Monitor MySQL
watch -n 1 'mysql -u root -e "SHOW PROCESSLIST;"'

# Check slow query log
mysql -u root -p
SET GLOBAL slow_query_log = 'ON';
SHOW VARIABLES LIKE 'slow_query%';
```

**Solution**: Indexes are already configured in schema.sql

---

## Configuration Issues

### ❌ "JWT_SECRET not configured"
**Solution**: Add to `.env.local`:
```env
JWT_SECRET="generate-a-random-secret-string"
```

**Generate random secret**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### ❌ "NODE_ENV is not 'production'"
**Local development**: Set to `development`
```env
NODE_ENV=development
```

**Production**: Set to `production`
```env
NODE_ENV=production
```

### ❌ CORS errors
**Error**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution** (if needed in future):
```typescript
// src/app/api/route.ts
const response = new NextResponse(data);
response.headers.set('Access-Control-Allow-Origin', '*');
response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
return response;
```

---

## Database Issues

### ❌ "Disk full" error
**Check space**:
```bash
df -h
du -sh /var/lib/mysql/

# Clean old logs:
cd /var/lib/mysql
rm ib_logfile* 2>/dev/null
sudo systemctl restart mysql
```

### ❌ Tables missing
**Check**:
```bash
mysql -u quantumalphaindiadb -p quantumalphaindiadb
SHOW TABLES;
```

**Restore**:
```bash
# Re-import schema
mysql -u quantumalphaindiadb -p quantumalphaindiadb < database/schema.sql
```

### ❌ Data corruption / need to reset
```bash
# Backup current data (optional)
mysqldump -u quantumalphaindiadb -p quantumalphaindiadb > backup.sql

# Drop and recreate database
mysql -u root -p
DROP DATABASE quantumalphaindiadb;
CREATE DATABASE quantumalphaindiadb;
GRANT ALL ON quantumalphaindiadb.* TO 'quantumalphaindiadb'@'127.0.0.1';

# Recreate schema
mysql -u quantumalphaindiadb -p quantumalphaindiadb < database/schema.sql
```

---

## File Upload/Deployment Issues

### ❌ "Permission denied" when uploading files
**Solution**: Check file permissions:
```bash
chmod 644 *.ts *.tsx *.json  # Files: 644
chmod 755 src app             # Dirs: 755
sudo chown -R www-data:www-data .
```

### ❌ "node_modules" too large to upload
**Solution**: Don't upload node_modules:
1. Upload only source code
2. Run: `npm install` on server

### ❌ ".env.local" not found in production
**Solution**: Recreate it in CloudPanel:
1. File manager → .env.local
2. Create new file
3. Add all required variables

---

## Testing Help

### Test signup endpoint
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123",
    "name": "Test User"
  }'
```

### Test login endpoint
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123"
  }'
```

### Test with valid token
```bash
# Replace TOKEN with response from login
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer TOKEN"
```

---

## Getting More Help

1. **Check logs** - Always check logs first
2. **Review documentation** - See `API.md`, `DEPLOYMENT.md`, etc
3. **Test locally first** - Easier to debug locally
4. **Verify configuration** - Check all env variables
5. **Search error message** - Often has solutions online

## Emergency Contacts

- CloudPanel Support: https://www.cloudpanel.io/support/
- MySQL Documentation: https://dev.mysql.com/doc/
- Next.js Documentation: https://nextjs.org/docs/
- Node.js Documentation: https://nodejs.org/docs/

---

**Last Updated**: February 27, 2026
