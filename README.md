# BullMQ-Simple-Producer-Worker 🚀

A clean and focused NestJS module demonstrating background job processing using BullMQ and Redis.

---

## 📁 Directory Structure

```
src/
├─queue
  ├─ queue.service.ts           # QueueService – produces jobs
  ├─ queue.processor.ts         # QueueProcessor – consumes jobs
  ├─ queue.controller.ts        # QueueController – HTTP endpoint to add jobs
  ├─ redis.factory.ts           # createRedisConnection helper
```

---

## 🧰 Features

- `POST /queue/add-job` endpoint to queue jobs with optional delay.
- Background worker processes jobs, logging job IDs and data.
- Listeners for `completed` and `failed` job events.
- Redis container configured via `docker-compose`.
- Clean shutdown on Nest app termination.

---

## 📦 Redis Setup

Include in `docker-compose.yml`:

```yaml
services:
  redis:
    image: redis:7-alpine
    container_name: redis
    hostname: redis
    ports:
      - '6379:6379'
    volumes:
      - redis-data:/data
    command: ['redis-server', '--appendonly', 'yes']
    restart: always
    networks:
      - net-db
```

This ensures persistent Redis storage with append-only file persistence.

---

## ⚙️ Getting Started

### 1. Install

```bash
yarn install
```

### 2. Configure Redis

Create `.env` and update from `.env.template`:

```
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Launch Redis

```bash
docker-compose up -d redis
```

### 4. Run Nest App

```bash
yarn start:dev
```

This includes your queue module coordinator.

---

## 🔧 Usage

### Add a Job

Send a `POST` request:

```http
POST http://localhost:3000/queue/add-job
Content-Type: application/json

{
  "data": { "foo": "bar" },
  "delayMs": 5000
}
```

**Response:**

```json
{
  "message": "Job added",
  "jobId": "some-uuid",
  "delayMs": 5000,
  "scheduledFor": "2025-07-22T05:30:00.000Z"
}
```

Delayed enqueue ensures job execution after 5 seconds (via Redis TTL).

---

### Background Processing

Your `QueueProcessor` automatically spins up:

- Logs upon job processing ❗
- On success: `completed` listener
- On failure: `failed` listener

---

## 🕒 Job Lifecycle Timing

1. Endpoint enqueues job with optional delay.
2. Redis stores job.
3. Worker fetches and processes after `delayMs`.
4. Completion/fail events are logged.

You can track **scheduled time** via the `scheduledFor` timestamp in the API response.

---

## 🔗 Summary

You're now equipped with a scalable, effective BullMQ background worker pattern in NestJS—complete with Redis persistence, job persistence, event handling, and production-grade reliability. Perfect as a standalone portfolio example or microservice blueprint!

---

## Contributing

Refer to [contribution guidlines](./docs/CONTRIBUTING.md) and [coding convntions](./docs/CODING_CONVENTIONS.md) and [code of conduct](./CODE_OF_CONDUCT.md).

---

## Stay in Touch

- **LinkedIn Profile**: [Muhammad Faraz Khan](https://www.linkedin.com/in/farazkhan455/)
- **GitHub Profile**: [Muhammad Faraz Khan](https://github.com/faraz455)
