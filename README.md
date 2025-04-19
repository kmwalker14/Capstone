# Arizona State University - Personal Website Development

A responsive, user-friendly personal website built for an ASU professor to present academic content, resources, and tools. 
This full-stack application features a public view for general users and a secure admin panel for authorized content management.

## Tech Stack
**Frontend**: Vue.js, Tiptap Editor, Axios  
**Backend**: Node.js, Express.js, MySQL  
**Authentication**: Auth0  
**Deployment**: Render (Frontend), Railway (Backend + Database)

--------------------------------------------------------------------------------------------------------------------------------

## Features

### Public View (No Login Required)
- Responsive layout for desktop, tablet, and mobile.
- Accessible academic content: research, teaching, publications, etc.
- Downloadable resources and external links.

### Admin View (Login Required)
- Secure Auth0-based login system.
- Admin dashboard with rich-text editors.
- CRUD operations on all content sections.
- Admin user management (create/edit/delete admins).

--------------------------------------------------------------------------------------------------------------------------------

## Authentication

- Managed via **Auth0** (login, JWT tokens).
- Admin credentials are required to access protected content.
- Environment variables:
  - `AUTH0_DOMAIN`
  - `AUTH0_CLIENT_ID`
  - `AUTH0_CLIENT_SECRET`

--------------------------------------------------------------------------------------------------------------------------------

## Installation & Setup

### Pre-requisites
- Node.js (v18+)
- MySQL (v8+)
- Auth0 account (provided)
- Railway & Render accounts (provided)

### Fronend Setup
```bash
cd frontend
npm install
npm run serve
```
### Backend Setup
```bash
cd backend
npm install
node server.js

