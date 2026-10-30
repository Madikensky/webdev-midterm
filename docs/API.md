# Site-Tracker API

REST API for managing construction/monitoring sites. All bodies are JSON.

- **Base URL:** `http://localhost:3000`
- **Content-Type:** `application/json` for requests with a body

## The `Site` object

| Field | Type | Notes |
|---|---|---|
| `id` | integer | assigned by the database |
| `name` | string | required, non-empty |
| `address` | string \| null | optional |
| `city` | string \| null | optional |
| `status` | string | optional, defaults to `active` |
| `created_at` | timestamp | set by the database |

```json
{
  "id": 1,
  "name": "Central Tower",
  "address": "12 Abay Ave",
  "city": "Almaty",
  "status": "active",
  "created_at": "2026-10-29T23:38:14.566Z"
}
```

## Endpoints

| Method | Path | Description | Success |
|---|---|---|---|
| GET | `/health` | Liveness check | 200 |
| GET | `/api/sites` | List all sites | 200 |
| GET | `/api/sites/:id` | Get one site | 200 |
| POST | `/api/sites` | Create a site | 201 |
| PUT | `/api/sites/:id` | Update a site | 200 |
| DELETE | `/api/sites/:id` | Delete a site | 204 |

---

### GET /health

Returns the service status. Not part of `/api`; used for health checks.

**Response 200**
```json
{ "status": "ok" }
```

```bash
curl http://localhost:3000/health
```

---

### GET /api/sites

Returns all sites ordered by `id`. An empty table returns `[]`.

**Response 200**
```json
[
  { "id": 1, "name": "Central Tower", "address": "12 Abay Ave", "city": "Almaty", "status": "active", "created_at": "2026-10-29T23:38:14.566Z" }
]
```

```bash
curl http://localhost:3000/api/sites
```

---

### GET /api/sites/:id

Returns a single site.

| Param | In | Description |
|---|---|---|
| `id` | path | integer id of the site |

**Responses**
- `200` the `Site` object
- `400` `{ "error": "Invalid id" }` when `id` is not an integer
- `404` `{ "error": "Site not found" }`

```bash
curl http://localhost:3000/api/sites/1
```

---

### POST /api/sites

Creates a site.

**Request body**
```json
{ "name": "North Plant", "address": "5 Lenin St", "city": "Astana", "status": "active" }
```
`name` is required. `address`, `city` and `status` are optional (`status` defaults to `active`).

**Responses**
- `201` the created `Site` (including its new `id`)
- `400` `{ "error": "name is required" }`

```bash
curl -X POST http://localhost:3000/api/sites \
  -H "Content-Type: application/json" \
  -d '{"name":"North Plant","city":"Astana"}'
```

---

### PUT /api/sites/:id

Replaces a site's fields. Send the full object: omitted optional fields are reset (`address`/`city` to `null`, `status` to `active`).

| Param | In | Description |
|---|---|---|
| `id` | path | integer id of the site |

**Request body**
```json
{ "name": "North Plant", "address": "5 Lenin St", "city": "Astana", "status": "inactive" }
```

**Responses**
- `200` the updated `Site`
- `400` `{ "error": "Invalid id" }` or `{ "error": "name is required" }`
- `404` `{ "error": "Site not found" }`

```bash
curl -X PUT http://localhost:3000/api/sites/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Central Tower","city":"Almaty","status":"inactive"}'
```

---

### DELETE /api/sites/:id

Deletes a site.

| Param | In | Description |
|---|---|---|
| `id` | path | integer id of the site |

**Responses**
- `204` no body
- `400` `{ "error": "Invalid id" }`
- `404` `{ "error": "Site not found" }`

```bash
curl -X DELETE http://localhost:3000/api/sites/1
```

## Errors

Errors use the shape `{ "error": "<message>" }`. Unexpected server or database failures return `500` with `{ "error": "Internal server error" }`.
