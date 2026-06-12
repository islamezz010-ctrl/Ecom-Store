/**
 * Health Check Monitoring
 * Monitors the health of all critical services
 */

const mongoose = require("mongoose");
const { getRedisClient } = require("./cache");

/**
 * Health check result for a service
 */
class HealthCheckResult {
  constructor(service, healthy, responseTime = 0, message = "") {
    this.service = service;
    this.healthy = healthy;
    this.responseTime = responseTime;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Check MongoDB connection
 */
const checkDatabase = async () => {
  const startTime = Date.now();
  try {
    const db = mongoose.connection;
    if (db.readyState === 1) {
      // Connected
      return new HealthCheckResult(
        "mongodb",
        true,
        Date.now() - startTime,
        "Connected",
      );
    } else if (db.readyState === 0) {
      // Disconnected
      return new HealthCheckResult(
        "mongodb",
        false,
        Date.now() - startTime,
        "Disconnected",
      );
    } else {
      return new HealthCheckResult(
        "mongodb",
        false,
        Date.now() - startTime,
        "Connecting...",
      );
    }
  } catch (error) {
    return new HealthCheckResult(
      "mongodb",
      false,
      Date.now() - startTime,
      error.message,
    );
  }
};

/**
 * Check Redis connection
 */
const checkRedis = async () => {
  const startTime = Date.now();
  try {
    const redis = getRedisClient();
    if (!redis) {
      return new HealthCheckResult(
        "redis",
        false,
        Date.now() - startTime,
        "Not configured",
      );
    }

    // Try to ping Redis
    await redis.ping();
    return new HealthCheckResult(
      "redis",
      true,
      Date.now() - startTime,
      "Connected",
    );
  } catch (error) {
    return new HealthCheckResult(
      "redis",
      false,
      Date.now() - startTime,
      error.message,
    );
  }
};

/**
 * Check Node.js memory usage
 */
const checkMemory = () => {
  const startTime = Date.now();
  try {
    const memUsage = process.memoryUsage();
    const heapUsedPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;

    // Warn if heap usage > 80%
    const healthy = heapUsedPercent < 80;

    return new HealthCheckResult(
      "memory",
      healthy,
      Date.now() - startTime,
      `Heap: ${heapUsedPercent.toFixed(2)}% (${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB / ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB)`,
    );
  } catch (error) {
    return new HealthCheckResult(
      "memory",
      false,
      Date.now() - startTime,
      error.message,
    );
  }
};

/**
 * Check CPU usage (uptime as proxy)
 */
const checkCPU = () => {
  const startTime = Date.now();
  try {
    const uptime = process.uptime();
    const cpuUsage = process.cpuUsage();

    // Convert to seconds
    const userCpuTime = cpuUsage.user / 1000000;
    const systemCpuTime = cpuUsage.system / 1000000;

    return new HealthCheckResult(
      "cpu",
      true,
      Date.now() - startTime,
      `Uptime: ${(uptime / 3600).toFixed(2)}h, User CPU: ${userCpuTime.toFixed(2)}s, System CPU: ${systemCpuTime.toFixed(2)}s`,
    );
  } catch (error) {
    return new HealthCheckResult(
      "cpu",
      false,
      Date.now() - startTime,
      error.message,
    );
  }
};

/**
 * Run all health checks
 */
const runHealthChecks = async () => {
  try {
    const checks = await Promise.all([
      checkDatabase(),
      checkRedis(),
      checkMemory(),
      checkCPU(),
    ]);

    const overallHealthy = checks.every((c) => c.healthy);

    return {
      status: overallHealthy ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks: checks.reduce((acc, check) => {
        acc[check.service] = {
          healthy: check.healthy,
          responseTime: check.responseTime,
          message: check.message,
        };
        return acc;
      }, {}),
    };
  } catch (error) {
    return {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message,
    };
  }
};

/**
 * Health check middleware for Express
 */
const healthCheckMiddleware = async (req, res) => {
  const result = await runHealthChecks();
  const statusCode = result.status === "healthy" ? 200 : 503;
  res.status(statusCode).json(result);
};

/**
 * Deep health check (verbose, for monitoring dashboards)
 */
const deepHealthCheck = async () => {
  const result = await runHealthChecks();

  // Add detailed database info
  try {
    const db = mongoose.connection;
    if (db.readyState === 1) {
      const adminDb = db.getClient().db().admin();
      const serverStatus = await adminDb.serverStatus();
      result.database = {
        version: serverStatus.version,
        uptime: serverStatus.uptime,
      };
    }
  } catch (error) {
    result.database = { error: error.message };
  }

  return result;
};

module.exports = {
  runHealthChecks,
  healthCheckMiddleware,
  deepHealthCheck,
  checkDatabase,
  checkRedis,
  checkMemory,
  checkCPU,
};
