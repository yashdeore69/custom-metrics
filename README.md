# Custom Metrics

## Overview

Project to manage custom metrics with CRUD API and frontend interface.

## Setup

Instructions coming soon.

## API

### GET /api/metrics
Fetch all metrics.

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Active Users",
      "description": "Number of users active in the last 24 hours",
      "calculationType": "count",
      "formula": "userCount",
      "createdAt": "2024-06-01T12:00:00.000Z"
    }
  ]
}
```

### POST /api/metrics
Create a new metric.

**Request Body Example:**
```json
{
  "name": "Active Users",
  "description": "Number of users active in the last 24 hours",
  "calculationType": "count",
  "formula": "userCount"
}
```
**Response Example:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Active Users",
    "description": "Number of users active in the last 24 hours",
    "calculationType": "count",
    "formula": "userCount",
    "createdAt": "2024-06-01T12:00:00.000Z"
  }
}
```

### PUT /api/metrics/:id
Update a metric by ID.

**Request Body Example:**
```json
{
  "name": "Active Users (24h)"
}
```
**Response Example:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Active Users (24h)",
    "description": "Number of users active in the last 24 hours",
    "calculationType": "count",
    "formula": "userCount",
    "createdAt": "2024-06-01T12:00:00.000Z"
  }
}
```

### DELETE /api/metrics/:id
Delete a metric by ID.

**Response Example:**
```json
{
  "success": true,
  "message": "Deleted"
}
```

## Frontend

Details coming soon. 