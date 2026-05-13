# Nelios Web Developer Assessment

Headless WordPress + Next.js project built for the Nelios Web Developer technical assessment.

The project includes a Docker-based WordPress backend with a custom post type for travel packages and a Next.js frontend using the App Router and Tailwind CSS. The frontend fetches package data from the WordPress REST API, displays the listing according to the provided Figma design, and includes filtering, sorting, responsive layouts, and empty-state handling.

---

## Tech Stack

- WordPress
- Custom Post Type for packages/items
- Advanced Custom Fields (ACF)
- WordPress REST API
- Next.js App Router
- React
- Tailwind CSS
- Docker / Docker Compose
- MySQL

---

## Project URLs

After starting the project, the services should be available at:

- Frontend: http://localhost:3000
- WordPress: http://localhost:8080
- WordPress Admin: http://localhost:8080/wp-admin/

---

## WordPress Credentials

- Username: `admin`
- Password: `admin123`

---

## Start the Project

From the project root, run:

```bash
docker compose up --build
```

This starts the WordPress backend, database, and Next.js frontend.

---

## Stop the Project

```bash
docker compose down
```

---

## Reset / Cleanup

To stop the project and remove containers, volumes, and database data:

```bash
docker compose down -v
```

Then restart with:

```bash
docker compose up --build
```

---

## Docker Services

The Docker setup includes:

- MySQL database container
- WordPress container
- Next.js frontend container

All services can be started together using Docker Compose.

---

## WordPress Backend

The WordPress backend contains a custom post type for the listed travel packages/items. Each package includes the data required by the frontend cards and filters, such as:

- Title
- Subtitle / duration
- Image
- Price
- Button text
- Additional filter-related fields where needed

The frontend fetches the data from the WordPress REST API endpoint, for example:

```bash
http://localhost:8080/wp-json/wp/v2/package?per_page=12
```

---

## Frontend

The frontend is built with Next.js App Router and Tailwind CSS.

Main features:

- Fetches package data from WordPress
- Displays responsive package cards
- Implements price filtering
- Implements sorting by price
- Includes mobile/tablet filter drawer
- Handles empty filtered results
- Implements the provided Figma design with responsive adaptations
- Includes desktop, tablet, and mobile responsive behavior

---

## Responsive Behaviour

The layout was implemented for:

- Desktop
- Tablet
- Mobile

On smaller screens, the filter sidebar becomes a fullscreen drawer. The package grid changes from three columns on desktop to two columns on tablet and one column on mobile.

---

## Notes

The design follows the provided Figma file closely, including typography, spacing, card styling, background imagery, buttons, and responsive layout behaviour.

---

## Submission

Repository includes:

- Source code
- Docker setup
- WordPress custom post type
- Next.js frontend
- Filtering functionality
- Responsive implementation
- Setup instructions
