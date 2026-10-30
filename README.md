# Site-Tracker

A small REST API for tracking sites (name, address, city, status). Light version of the CIP Tracker work project, built as a containerized backend with a PostgreSQL database.

## Tech stack

- Node.js 20 + Express 5
- PostgreSQL 16 (`pg` driver)
- Docker and Docker Compose

## Run

Requires Docker with Compose.

```bash
cp .env.example .env
docker compose up --build
```

The API is available at `http://localhost:3000`. Check it:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/sites
```

On the first start Postgres runs `backend/db/init.sql`, which creates the `sites` table and one sample row.

Stop with `docker compose down`. Data is kept in the named volume `pgdata`; use `docker compose down -v` to delete it and start fresh.

## Configuration

All configuration comes from environment variables in `.env` (template: `.env.example`).

| Variable | Description | Default in template |
|---|---|---|
| `PORT` | Port the API listens on (also published on the host) | `3000` |
| `DB_USER` | Postgres user | `postgres` |
| `DB_PASSWORD` | Postgres password | `postgres` |
| `DB_NAME` | Database name | `site_tracker` |
| `DB_PORT` | Postgres port inside the Docker network | `5432` |

The backend reaches the database at host `db` (the compose service name) over the `app-net` network.

## Project structure

```
.
├── backend/
│   ├── Dockerfile
│   ├── db/init.sql        # schema and seed data
│   └── src/
│       ├── index.js       # app setup
│       ├── db.js          # pg connection pool
│       └── routes/        # /api routes
├── docs/API.md            # API documentation
├── postman/               # Postman collection
├── docker-compose.yml
└── .env.example
```

## Documentation

- API reference: [docs/API.md](docs/API.md)
- Postman collection: [postman/site-tracker.postman_collection.json](postman/site-tracker.postman_collection.json). Import it in Postman and run the requests in order (the collection variable `baseUrl` defaults to `http://localhost:3000`).
