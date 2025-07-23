# BullMQ-Simple-Producer-Worker 🚀

A streamlined and production-ready NestJS module demonstrating **background job processing** using **BullMQ** and **Redis**.

---

## 🎥 Demo Video

▶️ [**Watch the Demo on Google Drive**](https://drive.google.com/file/d/1U5UzgMYvShMOwsP_Rb2pHjQmf4UK1JjF/view?usp=sharing)

> This video walks through the setup, how to add a job, and how the background processor works.

---

## 📁 Directory Structure

```
src/
├─ queue/
│  ├─ queue.service.ts        # QueueService – responsible for producing jobs
│  ├─ queue.processor.ts      # QueueProcessor – consumes and processes jobs
│  ├─ queue.controller.ts     # QueueController – HTTP endpoint to add jobs
│  ├─ redis.factory.ts        # Redis connection helper
```

---

## 🧰 Features

- `POST /queue/add-job` endpoint to queue jobs with an optional delay.
- **QueueProcessor** handles job processing — customize your logic here.
- Event listeners for `completed` and `failed` jobs.
- Graceful shutdown on NestJS application termination.
- **Swagger integrated** at `http://localhost:3000/swagger` — explore endpoints and test job submissions.

---

## 📦 Redis Setup

Add the following to your `docker-compose.yml`:

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

This configuration ensures persistent storage with Redis' append-only file (AOF) enabled.

---

## ⚙️ Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Configure Redis

Create a `.env` file from the provided `.env.template`:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Start Redis

```bash
docker-compose up -d redis
```

### 4. Run the NestJS App

```bash
yarn start:dev
```

---

## 🔧 Usage

### Add a Job

Use the `POST /queue/add-job` endpoint:

```http
POST http://localhost:3000/queue/add-job
Content-Type: application/json

{
  "data": { "foo": "bar" },
  "delayMs": 5000
}
```

**Response Example:**

```json
{
  "message": "Job added",
  "jobId": "some-uuid",
  "delayMs": 5000,
  "scheduledFor": "2025-07-22T05:30:00.000Z"
}
```

You can also use Swagger to send the request and inspect the schema at:

```
http://localhost:3000/swagger
```

> Here, you can interactively test your job submission, set custom data, and define execution time.

---

### 🔄 Background Job Processing

The `QueueProcessor` listens for jobs and performs the logic defined inside `queue.processor.ts`.

**You can define any custom logic inside `QueueProcessor` to handle job execution.**

- Job is processed automatically after the specified delay.
- Success/failure events are logged using BullMQ event listeners.

---

## 🕒 Job Lifecycle

1. Job is added via `/queue/add-job` (API or Swagger).
2. Redis stores the job with the specified delay.
3. `QueueProcessor` picks up the job after the delay.
4. Job logic is executed.
5. Completion or failure is logged accordingly.

---

## 🔗 Summary

This template provides a clean and scalable BullMQ-based background job processing system using NestJS and Redis.

- Modular and easy to extend
- Supports delayed job execution
- Built-in Swagger support for testing and visibility
- Ideal for microservices, task queues, scheduled tasks, or notification systems

---

## 🤝 Contributing

See our [Contribution Guidelines](./docs/CONTRIBUTING.md), [Coding Conventions](./docs/CODING_CONVENTIONS.md), and [Code of Conduct](./CODE_OF_CONDUCT.md) to get started.

---

## 🙋‍♂️ Stay Connected

- **LinkedIn**: [Muhammad Faraz Khan](https://www.linkedin.com/in/farazkhan455/)
- **GitHub**: [@faraz455](https://github.com/faraz455)
