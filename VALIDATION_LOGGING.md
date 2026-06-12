# Request Validation Logging

Request validation logging provides comprehensive tracking of all validation errors, suspicious inputs, and validation metrics in your application. This helps identify issues, security threats, and patterns in your API usage.

## Features

✅ **Validation Error Logging** — All validation failures are logged with context
✅ **Suspicious Input Detection** — XSS, SQL injection, NoSQL injection, and path traversal attempts
✅ **Validation Metrics** — Track success rates, error counts, and suspicious activity
✅ **Structured Logging** — JSON-formatted logs for easy parsing and monitoring
✅ **Performance Optimized** — Minimal overhead, only logs what's necessary

## How It Works

### Validation Error Logging

When a request fails validation, the system logs:

- **Timestamp** — When the error occurred
- **Request Details** — Method, URL, IP address, user agent
- **User ID** — Anonymous or authenticated user
- **Error Count** — Number of validation failures
- **Error Details** — Specific field errors and reasons

**Example Log Output:**

```
[VALIDATION_ERROR] {"timestamp":"2026-06-12T10:30:45.123Z","method":"POST","url":"/api/auth/register","ip":"192.168.1.1","userAgent":"Mozilla/5.0...","userId":"anonymous","source":"body","errorCount":2}
  [1] email: "email" must be a valid email
  [2] password: "password" must be at least 8 characters
```

### Suspicious Input Detection

The system automatically detects and logs suspicious patterns:

| Pattern                   | Reason          | Example                          |
| ------------------------- | --------------- | -------------------------------- |
| `<script>`, `javascript:` | XSS Attempt     | `<script>alert('xss')</script>`  |
| `UNION SELECT`, `INSERT`  | SQL Injection   | `'; DROP TABLE users--`          |
| `$where`, `$regex`        | NoSQL Injection | `{$where: "this.pass == 'abc'"}` |
| `../`, `etc/passwd`       | Path Traversal  | `../../etc/passwd`               |

**Example Log Output:**

```
[SUSPICIOUS_INPUT] 2026-06-12T10:35:22.456Z Field: description, Reason: XSS attempt, User: anonymous, IP: 192.168.1.1
```

### Validation Metrics

Track validation statistics in real-time:

```json
{
  "validation": {
    "uptime": 3600000,
    "totalValidations": 1245,
    "errors": 45,
    "successes": 1200,
    "suspicious": 3,
    "errorRate": 0.0361
  },
  "timestamp": "2026-06-12T10:40:00.000Z"
}
```

## Usage

### Basic Validation with Logging

The validation middleware automatically logs all errors:

```javascript
// server/routes/auth.js
const express = require("express");
const Joi = require("joi");
const validate = require("../middleware/validate");
const ctrl = require("../controllers/authController");

const router = express.Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
});

// Validation errors are automatically logged
router.post("/register", validate(registerSchema), ctrl.register);

module.exports = router;
```

### Environment Variables

Control logging behavior with environment variables:

```bash
# Enable validation success logging (verbose)
LOG_VALIDATION_SUCCESS=true

# Enable validation metrics logging
LOG_VALIDATION_METRICS=true

# Set logging level
NODE_ENV=production  # Hides stack traces in error responses
NODE_ENV=development # Shows detailed errors in responses
```

Add to [server/.env.example](../server/.env.example):

```env
# ── Validation Logging ──────────────────────
LOG_VALIDATION_SUCCESS=false
LOG_VALIDATION_METRICS=false
```

### View Validation Metrics

Access the validation metrics endpoint:

```bash
curl http://localhost:5000/api/admin/metrics/validation
```

Response:

```json
{
  "validation": {
    "uptime": 3600000,
    "totalValidations": 1245,
    "errors": 45,
    "successes": 1200,
    "suspicious": 3,
    "errorRate": 0.0361
  },
  "timestamp": "2026-06-12T10:40:00.000Z"
}
```

## Log Format

All validation logs follow this format:

```
[LOG_TYPE] [TIMESTAMP] [DETAILS]
```

**Log Types:**

- `[VALIDATION_ERROR]` — Validation rule violation
- `[VALIDATION_SUCCESS]` — (Optional) Valid request passed
- `[SUSPICIOUS_INPUT]` — Security threat detected
- `[VALIDATION_METRICS]` — Periodic metrics dump

## Monitoring & Alerts

### Parse Logs for Monitoring

Use tools like ELK Stack, CloudWatch, or Datadog to monitor:

```bash
# Extract validation errors
grep "\[VALIDATION_ERROR\]" server.log

# Extract suspicious activity
grep "\[SUSPICIOUS_INPUT\]" server.log

# Get error rate
grep "\[VALIDATION_ERROR\]" server.log | wc -l
```

### Set Up Alerts

Create alerts for:

1. **High Error Rate** — If error rate > 5%

   ```javascript
   if (stats.errorRate > 0.05) {
     // Send alert
   }
   ```

2. **Suspicious Activity** — If suspicious count > threshold

   ```javascript
   if (stats.suspicious > 10) {
     // Send security alert
   }
   ```

3. **Specific Fields** — If particular field has recurring errors
   ```bash
   grep "email.*invalid" server.log | wc -l
   ```

## Examples

### Example 1: Registration Validation

```bash
# Valid request
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securePass123","name":"John"}'

# Log output:
# [VALIDATION_SUCCESS] 2026-06-12T10:45:00.123Z POST /api/auth/register from 192.168.1.1
```

### Example 2: Invalid Email

```bash
# Invalid email
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email","password":"securePass123","name":"John"}'

# Log output:
# [VALIDATION_ERROR] {"timestamp":"2026-06-12T10:45:05.456Z",...,"errorCount":1}
#   [1] email: "email" must be a valid email
```

### Example 3: XSS Attack Attempt

```bash
# XSS attempt
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"items":[{"id":"1","quantity":"<script>alert(1)</script>"}]}'

# Log output:
# [SUSPICIOUS_INPUT] 2026-06-12T10:45:10.789Z Field: quantity, Reason: XSS attempt, User: anonymous, IP: 192.168.1.1
```

### Example 4: View Metrics

```bash
curl http://localhost:5000/api/admin/metrics/validation | jq .

# Output:
{
  "validation": {
    "uptime": 3600000,
    "totalValidations": 456,
    "errors": 12,
    "successes": 444,
    "suspicious": 2,
    "errorRate": 0.0263
  },
  "timestamp": "2026-06-12T10:45:30.000Z"
}
```

## Best Practices

1. **Monitor Error Trends** — Track error rates over time
2. **Alert on Suspicious Activity** — Set up notifications for security threats
3. **Analyze Failed Validations** — Use logs to improve validation rules
4. **Review User Patterns** — Identify problematic user groups
5. **Disable Success Logging in Production** — Save logs space (disabled by default)
6. **Archive Old Logs** — Implement log rotation for storage management
7. **Sanitize Logs** — Never log passwords or sensitive data (already built-in)

## Troubleshooting

### Logs Not Appearing

1. Check environment variables are set
2. Ensure validation middleware is applied to routes
3. Check `NODE_ENV` — some logs only show in development

### Too Many Logs

1. Disable `LOG_VALIDATION_SUCCESS` (disabled by default)
2. Reduce log verbosity in morgan middleware
3. Implement log sampling for high-traffic endpoints

### Performance Impact

- Minimal overhead (<1ms per request)
- Regex-based pattern detection is cached
- Metrics are computed on-demand

## Integration with Monitoring Tools

### Render Logs

Logs automatically appear in Render Dashboard → Logs tab.

### External Monitoring

Configure in Render environment:

```bash
# Send logs to external service
LOG_AGGREGATION_URL=https://logs.example.com/api/logs
```

### Local Development

Logs output to console. To save to file:

```bash
npm run dev 2>&1 | tee server.log
```

## Related Files

- [server/middleware/validationLogger.js](../server/middleware/validationLogger.js) — Logging implementation
- [server/middleware/validate.js](../server/middleware/validate.js) — Validation middleware
- [server/middleware/errorHandler.js](../server/middleware/errorHandler.js) — Error handling
- [server/.env.example](../server/.env.example) — Environment configuration
