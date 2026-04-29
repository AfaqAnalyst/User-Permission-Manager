# RLS Permission Manager
### Full-Stack Node.js + Oracle + Tableau Server

---

## 📁 Project Structure

```
rls-manager/
├── server.js              ← Main entry point
├── package.json           ← Dependencies
├── .env.example           ← Copy to .env and fill values
├── config/
│   ├── db.js              ← Oracle connection pool
│   └── setup.js           ← One-time DB initialization
├── routes/
│   ├── users.js           ← CRUD API for users
│   └── meta.js            ← KPIs, Orgs, Dashboard, Setup
└── public/
    └── index.html         ← Full frontend (served by Express)
```

---

## 🚀 Installation — Step by Step

### Step 1: Install Node.js
Download from: https://nodejs.org (v18 or above)

### Step 2: Install Oracle Instant Client
Required for oracledb npm package:
- Download from: https://www.oracle.com/database/technologies/instant-client/downloads.html
- Choose: Basic Package for your OS
- Add to PATH environment variable

### Step 3: Setup Project
```bash
# Copy project folder to your server
cd rls-manager

# Install dependencies
npm install

# Copy environment file
copy .env.example .env      # Windows
cp .env.example .env        # Linux/Mac
```

### Step 4: Configure .env
Edit `.env` file with your Oracle details:
```
DB_USER=your_oracle_username
DB_PASSWORD=your_oracle_password
DB_HOST=192.168.1.xxx        ← Your Oracle server IP
DB_PORT=1521
DB_SERVICE=ORCL              ← Your Oracle SID or Service Name
PORT=3000
```

### Step 5: Start Server
```bash
npm start
```

### Step 6: Open Browser
```
http://localhost:3000
```

### Step 7: Run DB Setup (First Time Only)
1. Open http://localhost:3000
2. Click "DB Setup" in left sidebar
3. Click "Run Database Setup"
4. Wait for completion ✅

---

## 🌐 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/health | Database health check |
| GET | /api/users | Get all users with permissions |
| GET | /api/users/:id | Get single user |
| POST | /api/users | Create new user |
| PUT | /api/users/:id | Update user + permissions |
| DELETE | /api/users/:id | Delete user |
| PATCH | /api/users/:id/toggle | Toggle active/inactive |
| GET | /api/users/audit/log | Get audit log |
| GET | /api/kpis | Get all KPIs |
| GET | /api/orgs | Get all organizations |
| GET | /api/dashboard | Dashboard statistics |
| POST | /api/bulk-import | Import multiple users |
| POST | /api/setup | Run DB initialization |

---

## 🔐 Tableau Server Integration

After running setup, your Oracle view `v_rls_permissions` is ready.

### Custom SQL for each data source:
```sql
SELECT d.*
FROM   your_kpi_table d
INNER JOIN v_rls_permissions p
    ON  d.org_id      = p.org_id
    AND p.kpi_code    = 'TS'       ← Change per KPI
    AND p.username    = USERNAME() ← Tableau built-in
```

### Data Source Filter:
- Field: `NOT ISNULL([username])`
- Value: `True`

---


## 📞 Support
If Oracle connection fails — check:
1. Oracle Instant Client installed and in PATH
2. .env values correct
3. Firewall allows port 1521
4. Oracle user has SELECT privileges
