#!/usr/bin/env node

/**
 * Error Monitoring & Health Check Integration Info
 *
 * This script provides information about the error monitoring and health check system.
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║      ERROR MONITORING & HEALTH CHECK - INTEGRATION READY       ║
╚════════════════════════════════════════════════════════════════╝

✅ ERROR TRACKING (Sentry)

Status: Ready (requires SENTRY_DSN to activate)

Features:
  ✓ Automatic exception tracking
  ✓ Error context capture (user, IP, request details)
  ✓ Performance monitoring
  ✓ Release tracking
  ✓ Graceful shutdown with event flushing

═══════════════════════════════════════════════════════════════════

✅ HEALTH CHECK MONITORING

Status: Active and ready to use

Endpoints:
  GET /health
    └─ Quick health check (all services)
    └─ Returns: {status, uptime, checks}
    └─ Status codes: 200 (healthy), 503 (degraded)

  GET /api/admin/health/deep
    └─ Detailed health check (verbose diagnostics)
    └─ Includes database version, uptime details

Monitored Services:
  • MongoDB — Connection status, response time
  • Redis — Connection status, PING response
  • Memory — Heap usage percentage and size
  • CPU — Uptime, user CPU, system CPU time

═══════════════════════════════════════════════════════════════════

🚀 QUICK START

1. Set Up Sentry (Optional but Recommended)
   
   a) Create account at https://sentry.io
   b) Create new Node.js project
   c) Copy DSN
   d) Add to server/.env:
      SENTRY_DSN=https://your-key@your-org.ingest.sentry.io/your-project-id
   e) Restart server
   
   Verification:
   $ curl http://localhost:5000/health

2. Test Health Checks
   
   Basic health check:
   $ curl http://localhost:5000/health | jq
   
   Output:
   {
     "status": "healthy",
     "timestamp": "2026-06-12T14:30:00.000Z",
     "uptime": 3600,
     "checks": {
       "mongodb": { "healthy": true, "responseTime": 12 },
       "redis": { "healthy": true, "responseTime": 5 },
       "memory": { "healthy": true, "responseTime": 1 },
       "cpu": { "healthy": true, "responseTime": 2 }
     }
   }

3. Monitor Production
   
   Render (automatic):
   $ curl https://your-service.onrender.com/health
   
   UptimeRobot (setup monitoring):
   - URL: https://your-service.onrender.com/health
   - Frequency: 5 minutes
   - Alerts: Email on downtime

4. Configure Sentry Alerts
   
   In Sentry Dashboard → Alerts:
   - New issue alert
   - Error rate alert (>5% per hour)
   - Custom rules based on tags/environment

═══════════════════════════════════════════════════════════════════

📊 MONITORING ARCHITECTURE

┌─────────────────────────────────────────┐
│          Your E-commerce App            │
├─────────────────────────────────────────┤
│                                         │
│  Sentry Integration (Optional)          │
│  ├─ Automatic error capture             │
│  ├─ Performance monitoring              │
│  └─ Alerts to Sentry dashboard          │
│                                         │
│  Error Handler Middleware               │
│  ├─ Logs errors locally                 │
│  ├─ Sends to Sentry                     │
│  └─ Returns error response              │
│                                         │
│  Health Check System                    │
│  ├─ Monitors MongoDB                    │
│  ├─ Monitors Redis                      │
│  ├─ Tracks memory usage                 │
│  └─ Tracks CPU usage                    │
│                                         │
└─────────────────────────────────────────┘
          ↓            ↓            ↓
     Sentry.io    Local Logs   Health API

═══════════════════════════════════════════════════════════════════

🔍 ERROR TRACKING EXAMPLES

Example 1: Invalid Email During Registration

Request:
  POST /api/auth/register
  { "email": "invalid-email", "password": "SecurePass123" }

Console Log:
  [ERROR] POST /api/auth/register: "email" must be a valid email

Sentry Event:
  {
    "level": "error",
    "message": "\\"email\\" must be a valid email",
    "contexts": {
      "custom": {
        "method": "POST",
        "url": "/api/auth/register",
        "userId": "anonymous",
        "ip": "192.168.1.1"
      }
    }
  }

Example 2: Database Connection Error

Scenario: MongoDB connection drops during request

Console Log:
  [ERROR] POST /api/orders: MongooseError: connect ECONNREFUSED

Sentry Event:
  {
    "level": "error",
    "message": "MongooseError: connect ECONNREFUSED",
    "exception": { "values": [{ "stacktrace": "..." }] },
    "contexts": {
      "custom": {
        "method": "POST",
        "url": "/api/orders",
        "userId": "user-123"
      }
    }
  }

═══════════════════════════════════════════════════════════════════

📈 HEALTH CHECK RESPONSE DETAILS

Status Field Values:
  "healthy"   → All services OK (HTTP 200)
  "degraded"  → One or more services not responding (HTTP 503)
  "unhealthy" → Health check itself failed (HTTP 500)

Check Response:
  {
    "service": "mongodb",
    "healthy": true,
    "responseTime": 12,  // milliseconds
    "message": "Connected"
  }

Common Issues:

MongoDB Disconnected:
  "message": "Disconnected"
  → Restart server or check connection string

Redis Not Configured:
  "message": "Not configured"
  → Normal if REDIS_URL not set in .env

High Memory:
  "healthy": false,
  "message": "Heap: 92% (181.5 MB / 197.12 MB)"
  → Consider server restart or resource upgrade

═══════════════════════════════════════════════════════════════════

⚙️  INTEGRATION POINTS

Files Modified/Created:
  ✓ server/config/sentry.js (new) — Sentry setup
  ✓ server/middleware/healthCheck.js (new) — Health checks
  ✓ server/middleware/errorHandler.js (updated) — Sentry integration
  ✓ server/index.js (updated) — Initialize Sentry, health endpoints
  ✓ server/.env.example (updated) — SENTRY_DSN configuration

Environment Variables:
  SENTRY_DSN — Sentry error tracking DSN (optional)
  APP_VERSION — Application version for release tracking

═══════════════════════════════════════════════════════════════════

📡 PRODUCTION DEPLOYMENT

1. Get Sentry DSN
   → https://sentry.io → New Project → Copy DSN

2. Set in Render
   → Render Dashboard → Your Service → Environment
   → Add SENTRY_DSN variable

3. Verify Errors Are Captured
   → Trigger an error (wrong login, invalid data)
   → Check Sentry dashboard for error
   → Confirm email alert received

4. Set Up External Monitoring
   → UptimeRobot: Monitor /health endpoint
   → Datadog: Create synthetic test
   → CloudWatch: Lambda health check function

═══════════════════════════════════════════════════════════════════

🔐 SECURITY NOTES

✓ Health checks are public (no auth required) for monitoring
✓ Deep health checks should be protected (add auth check)
✓ Sentry DSN is safe to expose (not secret)
✓ Sensitive data (passwords) never logged
✓ PII redaction: Configure in Sentry dashboard

═══════════════════════════════════════════════════════════════════

📚 NEXT STEPS

1. Create Sentry account (optional but recommended)
2. Deploy to production
3. Set up external monitoring (UptimeRobot or Datadog)
4. Configure alerts
5. Review logs daily during first week
6. Adjust alert thresholds based on patterns

═══════════════════════════════════════════════════════════════════

📖 DOCUMENTATION

Full guide: see ERROR_MONITORING.md

Topics Covered:
  ✓ Sentry setup and configuration
  ✓ Health check endpoints and status codes
  ✓ Service monitoring (MongoDB, Redis, Memory, CPU)
  ✓ Alert configuration
  ✓ Troubleshooting guide
  ✓ Production deployment checklist

═══════════════════════════════════════════════════════════════════
`);
