# Error Monitoring & Health Check Monitoring

This guide covers error tracking with Sentry and comprehensive health check monitoring for your production e-commerce store.

## Overview

The system provides:

- **Error Tracking** — Automatic exception monitoring via Sentry
- **Health Checks** — Real-time monitoring of critical services
- **Performance Monitoring** — Tracks request performance and errors
- **Alerts** — Notifications for errors and degraded services

## Sentry Error Monitoring

### Setup

#### 1. Create Sentry Account

1. Go to [https://sentry.io](https://sentry.io)
2. Sign up for a free account
3. Create a new project for Node.js
4. Copy your **DSN** (Data Source Name)

#### 2. Configure Environment Variables

In `server/.env`:

```bash
SENTRY_DSN=https://your-key@your-org.ingest.sentry.io/your-project-id
APP_VERSION=1.0.0
```

#### 3. Deploy

The system will automatically track errors in production.

### How It Works

When an error occurs:

1. Error is logged to console
2. Error is captured by Sentry
3. Error details are sent to sentry.io dashboard
4. You receive notifications (configurable)

### Error Context

All errors include:

```json
{
  "method": "POST",
  "url": "/api/auth/register",
  "userId": "user-id-or-null",
  "userEmail": "user@example.com",
  "ip": "192.168.1.1",
  "message": "Error message",
  "stack": "Stack trace"
}
```

### Example: Authentication Error

```javascript
// User tries to register with existing email
// Error is caught and logged:

[ERROR] POST /api/auth/register: Duplicate value for: email

// Sentry captures:
{
  "event_id": "abc123",
  "message": "Duplicate value for: email",
  "level": "error",
  "platform": "node",
  "contexts": {
    "custom": {
      "method": "POST",
      "url": "/api/auth/register",
      "userId": "anonymous"
    }
  }
}
```

### Sentry Dashboard Features

**Issues Tab**

- View all errors grouped by type
- See error frequency and first occurrence
- Track error resolution

**Alerts**

- Get notified when new errors occur
- Set thresholds for error rates
- Configure notification channels (email, Slack, etc.)

**Performance**

- Monitor request latency
- Track slowest endpoints
- Identify performance regressions

**Release Tracking**

- Track errors by release version
- Compare error rates across versions
- Set `APP_VERSION` to track releases

### Custom Error Tracking

Manually capture errors in code:

```javascript
const {
  captureException,
  captureMessage,
  addBreadcrumb,
} = require("./config/sentry");

// Capture an exception
try {
  // Your code
} catch (error) {
  captureException(error, { customField: "value" });
}

// Capture a message
captureMessage("Payment processing delayed", "warning", {
  paymentId: "123",
  amount: 99.99,
});

// Add breadcrumb for context
addBreadcrumb("User initiated checkout", "action", {
  cartValue: 99.99,
  itemCount: 3,
});
```

---

## Health Check Monitoring

### Basic Health Check

The basic health check endpoint returns a quick status:

```bash
curl http://localhost:5000/health
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2026-06-12T14:30:00.000Z",
  "uptime": 3600,
  "checks": {
    "mongodb": {
      "healthy": true,
      "responseTime": 12,
      "message": "Connected"
    },
    "redis": {
      "healthy": true,
      "responseTime": 5,
      "message": "Connected"
    },
    "memory": {
      "healthy": true,
      "responseTime": 1,
      "message": "Heap: 45.32% (89.43 MB / 197.12 MB)"
    },
    "cpu": {
      "healthy": true,
      "responseTime": 2,
      "message": "Uptime: 1.00h, User CPU: 2.34s, System CPU: 1.12s"
    }
  }
}
```

### Deep Health Check

Detailed health check for monitoring dashboards:

```bash
curl http://localhost:5000/api/admin/health/deep
```

Includes database version, uptime, and detailed diagnostics.

### Health Check Status Codes

| Status Code | Meaning                       | Action                 |
| ----------- | ----------------------------- | ---------------------- |
| 200         | All services healthy          | ✅ No action needed    |
| 503         | One or more services degraded | ⚠️ Investigate and fix |
| 500         | Health check failed           | 🔴 Critical error      |

### Monitored Services

#### 1. MongoDB

Checks:

- Connection status (connected, disconnected, connecting)
- Response time
- Error message if failed

**Troubleshooting:**

```bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Reconnect manually
npm run dev
```

#### 2. Redis

Checks:

- Connection status
- Response time (via PING)
- Configured status (if not set, shows "Not configured")

**Troubleshooting:**

```bash
# Check Redis connection
redis-cli ping

# Restart Redis
docker restart redis-container
```

#### 3. Memory Usage

Checks:

- Heap memory percentage
- Used vs. total heap
- Warns if > 80% usage

**Troubleshooting:**

```bash
# Memory leak detected?
# 1. Check for accumulating objects
# 2. Review error logs for patterns
# 3. Restart server if necessary

# Monitor over time
curl http://localhost:5000/health | jq .checks.memory
```

#### 4. CPU Usage

Checks:

- Process uptime
- User CPU time
- System CPU time

**Troubleshooting:**

```bash
# High CPU usage?
# 1. Check for infinite loops in code
# 2. Review slow database queries
# 3. Check for expensive computations
```

---

## Monitoring Setup

### Render Deployment

Health checks are automatically available:

```bash
# Simple health check
curl https://your-service.onrender.com/health

# Deep health check
curl https://your-service.onrender.com/api/admin/health/deep
```

### External Monitoring Services

#### Option 1: UptimeRobot

1. Create account at [uptime.robot](https://uptime.robot)
2. Add monitor for `https://your-service.onrender.com/health`
3. Set frequency: check every 5 minutes
4. Configure alerts for downtime

#### Option 2: Datadog

1. Create account at [datadog.com](https://datadog.com)
2. Create synthetic test:
   ```yaml
   name: Health Check
   type: api
   url: https://your-service.onrender.com/health
   frequency: 5m
   ```
3. Set up alerts for failures

#### Option 3: AWS CloudWatch

1. Create Lambda function to call health endpoint
2. Schedule via CloudWatch Events (every 5 minutes)
3. Log results to CloudWatch
4. Set alarms for failures

### Set Up Alerts

#### Sentry Alerts

In Sentry Dashboard → Alerts:

1. **New Issue** — Alert on new error types
2. **Error Rate** — Alert if error rate > 5% in 1 hour
3. **Custom Threshold** — Configure specific rules

**Example Alert Rule:**

```
Event: Error
Condition: Error rate > 5% in the last 1 hour
Action: Send email to team
```

#### Custom Alerts

Create a monitoring script:

```javascript
// server/scripts/healthCheck.js
const http = require("http");

const checkHealth = async () => {
  return new Promise((resolve) => {
    http
      .get("http://localhost:5000/health", (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const health = JSON.parse(data);
          resolve(health.status === "healthy");
        });
      })
      .on("error", () => resolve(false));
  });
};

// Run every 5 minutes
setInterval(
  async () => {
    const healthy = await checkHealth();
    if (!healthy) {
      // Send alert (Slack, email, etc.)
      console.error("🔴 Health check failed!");
    }
  },
  5 * 60 * 1000,
);
```

---

## Logs & Debugging

### View Sentry Logs

In Sentry Dashboard:

1. **Issues** → See all errors
2. **Event Details** → View full context
3. **Breadcrumbs** → Trace user actions before error
4. **Tags** → Filter by environment, version, etc.

### View Local Logs

```bash
# Start server and capture logs
npm run dev 2>&1 | tee server.log

# View errors
grep "\[ERROR\]" server.log

# View health checks
grep "health" server.log
```

### Health Check Logging

Enable verbose health check logging:

```javascript
// Add to server/index.js
const { runHealthChecks } = require("./middleware/healthCheck");

// Log health status periodically
setInterval(async () => {
  const health = await runHealthChecks();
  console.log("[HEALTH_CHECK]", JSON.stringify(health));
}, 60000); // Every minute
```

---

## Production Checklist

Before deploying to production:

- [ ] Create Sentry account
- [ ] Set `SENTRY_DSN` in Render environment
- [ ] Test error tracking with test error
- [ ] Set up Sentry alerts
- [ ] Configure health check monitoring (UptimeRobot, Datadog, etc.)
- [ ] Test health endpoints
- [ ] Verify MongoDB and Redis connections
- [ ] Document alarm escalation process
- [ ] Brief team on alert procedures

---

## Example: Complete Error Flow

```
1. User tries to login with wrong password
   ↓
2. Validation passes, password comparison fails
   ↓
3. Controller throws error: "Invalid email or password"
   ↓
4. Error caught by Express error handler
   ↓
5. captureException() sends to Sentry
   ↓
6. Sentry receives error with context
   ↓
7. Alert triggered (if configured)
   ↓
8. Admin notified via email/Slack
   ↓
9. Admin investigates in Sentry dashboard
   ↓
10. Error resolved, issue closed
```

---

## Troubleshooting

### Sentry not capturing errors

1. Check `SENTRY_DSN` is set correctly
2. Verify DSN has not been revoked in Sentry
3. Check NODE_ENV (Sentry is disabled in "test")
4. Verify error is being thrown (not silently caught)

### Health check returns 503

```json
{
  "status": "degraded",
  "checks": {
    "mongodb": { "healthy": false, "message": "Disconnected" }
  }
}
```

**Solution:**

- Restart MongoDB connection
- Check MongoDB credentials
- Verify network connectivity

### High memory usage

```json
{
  "checks": {
    "memory": { "healthy": false, "message": "Heap: 92% ..." }
  }
}
```

**Solution:**

- Restart server
- Review logs for memory leaks
- Increase server resources (if hosted on limited tier)

---

## Resources

- [Sentry Documentation](https://docs.sentry.io/product/releases/)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Health Check Best Practices](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [Monitoring Guide](https://nodejs.org/en/docs/guides/simple-profiling/)

---

## Related Files

- [server/config/sentry.js](server/config/sentry.js) — Sentry configuration
- [server/middleware/healthCheck.js](server/middleware/healthCheck.js) — Health checks
- [server/middleware/errorHandler.js](server/middleware/errorHandler.js) — Error handling
- [server/index.js](server/index.js) — Server setup with integrations
- [server/.env.example](server/.env.example) — Environment variables
