# CloudPanel Deployment Guide for Quantum Alpha India

This guide explains how to deploy the Quantum Alpha India trading platform on CloudPanel with MySQL/phpMyAdmin.

## Prerequisites

- CloudPanel account and server access
- MySQL/phpMyAdmin available in CloudPanel
- SSH access to your server
- Node.js 18+ installed on the server

## Step 1: Prepare Your Server

### 1.1 Connect via SSH
```bash
ssh user@your-server-ip
```

### 1.2 Navigate to your web root
```bash
cd /home/cloudpanel/htdocs/your-domain.com
```

### 1.3 Clone or upload your project
```bash
git clone <your-repo-url> .
# or
# Upload files via CloudPanel file manager
```

## Step 2: Set Up the Database

### 2.1 Create Database via CloudPanel phpMyAdmin
1. Log in to CloudPanel
2. Go to phpMyAdmin
3. Create a new database named `quantumalphaindiadb`
4. Create a user `quantumalphaindiadb` with password `quantumalphaindiadb2026`
5. Grant all privileges to the user for this database

### 2.2 Import Database Schema
1. In phpMyAdmin, select the `quantumalphaindiadb` database
2. Click "Import" tab
3. Upload the `database/schema.sql` file
4. Click "Go" to execute

Or via SSH:
```bash
mysql -h 127.0.0.1 -u quantumalphaindiadb -p"quantumalphaindiadb2026" quantumalphaindiadb < database/schema.sql
```

## Step 3: Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Build the Next.js application
npm run build
```

## Step 4: Configure Environment Variables

### 4.1 Update .env.local
Edit `.env.local` and update the following variables for your production environment:

```env
# Update JWT_SECRET with a strong random string
JWT_SECRET="generate-a-strong-random-string-here"

# Update NEXTAUTH_SECRET
NEXTAUTH_SECRET="generate-another-random-string-here"

# Update API Security Secret
QUANTUM_ALPHA_SECRET="your-api-security-secret"

# Set production URL
NEXT_PUBLIC_APP_URL=https://your-domain.com
WEBSITE_URL=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
```

**Important:** Never commit `.env.local` to git. CloudPanel stores it in the deployed directory.

## Step 5: Configure CloudPanel

### 5.1 Create Node.js Environment in CloudPanel

After uploading your code to CloudPanel:

1. Log in to CloudPanel
2. Go to **Applications** → **Node.js**
3. Select your domain
4. Set the following:
   - **Name**: Quantum Alpha India
   - **Node.js Version**: 18+
   - **Port**: 3000 (or your preference)
   - **Package Manager**: npm
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Production

### 5.2 Create Systemd Service

CloudPanel automatically creates a systemd service. Verify it:

```bash
sudo systemctl status quantum-alpha-india
sudo systemctl restart quantum-alpha-india
```

### 5.3 Configure SSL Certificate

CloudPanel automatically handles SSL with Let's Encrypt:

1. Applications → Select your domain
2. SSL tab
3. Request a new certificate (if not already done)

### 5.4 Set Up Reverse Proxy

CloudPanel uses Nginx. Your reverse proxy configuration is handled automatically.

## Step 6: Verify Installation

### 6.1 Check Application Status
```bash
sudo systemctl status quantum-alpha-india
pm2 status  # if using PM2
```

### 6.2 Check Logs
```bash
# CloudPanel logs
sudo tail -f /var/log/cloudpanel/applications.log

# Application logs
pm2 logs quantum-alpha-india  # if using PM2
```

### 6.3 Test API Endpoints
```bash
# Test signup
curl -X POST https://your-domain.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Test login
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## Step 7: Database Backups

### CloudPanel Automated Backups
1. Go to Applications → Backups
2. Configure automatic backups
3. Set frequency (daily recommended)
4. Select backup destination (SFTP, S3, etc.)

### Manual Backup
```bash
mysqldump -h 127.0.0.1 -u quantumalphaindiadb -p"quantumalphaindiadb2026" quantumalphaindiadb > backup-$(date +%Y%m%d).sql
```

### Restore from Backup
```bash
mysql -h 127.0.0.1 -u quantumalphaindiadb -p"quantumalphaindiadb2026" quantumalphaindiadb < backup-20240227.sql
```

## Step 8: Monitoring

### CloudPanel Monitoring Dashboard
1. Log in to CloudPanel
2. Dashboard shows real-time metrics
3. Set up alerts for critical metrics

### Application Health Check
```bash
# Create a health check endpoint (optional)
curl https://your-domain.com/api/health
```

## Step 9: Security Hardening

### 9.1 Database User Permissions
Ensure database user has minimal required permissions:

```sql
REVOKE ALL PRIVILEGES ON quantumalphaindiadb.* FROM 'quantumalphaindiadb'@'127.0.0.1';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, ALTER ON quantumalphaindiadb.* TO 'quantumalphaindiadb'@'127.0.0.1';
FLUSH PRIVILEGES;
```

### 9.2 Firewall Configuration
CloudPanel integrates with OS-level firewall. Restrict database access:

```bash
# Allow MySQL only from localhost
sudo ufw allow from 127.0.0.1 to any port 3306
sudo ufw deny from any to any port 3306
```

### 9.3 Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js (if needed)
sudo n latest
```

## Troubleshooting

### Application Won't Start
1. Check logs: `sudo journalctl -u quantum-alpha-india -n 50`
2. Verify .env.local is correctly configured
3. Check database connectivity: `mysql -u quantumalphaindiadb -p < /dev/null`

### Database Connection Issues
1. Verify credentials in .env.local
2. Check MySQL is running: `sudo systemctl status mysql`
3. Test connection: `mysql -h 127.0.0.1 -u quantumalphaindiadb -p`

### Slow Performance
1. Check database indexes: All tables have proper indexes
2. Monitor server resources: Use CloudPanel dashboard
3. Enable query logging if needed

### SSL Certificate Issues
1. Renew certificate: CloudPanel → Applications → SSL → Renew
2. Check certificate validity: `curl -I https://your-domain.com`

## Support Resources

- [CloudPanel Documentation](https://www.cloudpanel.io/docs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment/static-exports)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Node.js Best Practices](https://nodejs.org/en/docs/)

## Maintenance Tasks

### Weekly
- Review audit logs: `SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100;`
- Check application logs for errors

### Monthly
- Review database size and performance
- Verify backups are working
- Update dependencies: `npm update`

### Quarterly
- Security audit of configuration
- Database optimization
- Log rotation and cleanup

## Rollback Procedure

If an update causes issues:

```bash
# Stop the application
sudo systemctl stop quantum-alpha-india

# Rollback to previous version
git revert HEAD --no-edit
git push

# Rebuild and restart
npm install
npm run build
sudo systemctl start quantum-alpha-india
```
