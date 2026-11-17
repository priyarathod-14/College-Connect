# College Connect – SAKEC Event Discovery & Registration

A beginner-friendly React + Bootstrap microproject demonstrating the Advanced JavaScript syllabus.

## 1. Requirements
- Node.js 20.19+ or 22.12+
- npm
- VS Code (recommended)

Check versions:
```bash
node -v
npm -v
```

## 2. Run the project
Open the project folder in VS Code, open Terminal, and run:
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

To create a production build:
```bash
npm run build
npm run preview
```

## 3. Hosted REST API setup (MockAPI)
The project runs immediately in demo mode using localStorage. To connect hosted data:

1. Create a project at https://mockapi.io/.
2. Create two resources with these exact names: `events` and `registrations`.
3. In each resource, add the fields below (MockAPI also creates an `id` field automatically).

`events` fields:
- title (string)
- category (string)
- date (string)
- time (string)
- venue (string)
- organizer (string)
- description (string)
- capacity (number)
- image (string)

`registrations` fields:
- eventId (string)
- eventTitle (string)
- name (string)
- email (string)
- rollNo (string)
- department (string)
- year (string)
- createdAt (string)

4. Copy the project base URL shown by MockAPI, e.g. `https://YOUR_PROJECT.mockapi.io/api/v1`.
5. Copy `.env.example` to a new file named `.env` and set:
   `VITE_API_BASE_URL=https://YOUR_PROJECT.mockapi.io/api/v1`
6. Stop and restart Vite after changing `.env`:
```bash
npm run dev
```

When the hosted `events` resource is empty, the app adds sample events automatically. Registrations are sent to the hosted `registrations` resource. If the API is unavailable, the app continues in local demo mode and shows a warning.

**Important:** MockAPI is a teaching/demo backend. Do not store passwords, sensitive student data, or real confidential information in it. A real college deployment needs authenticated server-side authorization, privacy controls, and server-side validation.

## 4. Demo login/profile
No password login is included because this is a front-end academic prototype. Students enter their details on the registration form. The name is remembered in the current browser for convenience.

## 5. Syllabus mapping
- ES6: `const`, `let`, arrow functions, template literals, destructuring, spread syntax.
- DOM: React renders and updates UI; `document.title` is updated on route changes.
- Events/forms: controlled inputs, click events, submit handler and validation.
- Storage: localStorage for demo data and student profile; sessionStorage for session visit marker.
- Error handling: `try/catch`, `throw`, API error messages and fallback.
- JSON/Fetch/AJAX: `src/services/api.js` sends asynchronous JSON requests without page reload.
- Promises: async/await and a `.then().catch()` example in API service.
- REST: GET, POST and DELETE requests to MockAPI resources.
- CORS: browser security rule; MockAPI must permit your website origin. Configure allowed origins if the service asks.
- Bootstrap 5: navbar, grid, cards, forms, buttons and responsive layout.
- React: JSX, reusable components, props, React Router and Context API.
- Chart.js: registration count by event category.
- Deployment: GitHub Pages or Netlify (see below).

## 6. Deploy on Netlify
1. Push the project folder to a GitHub repository.
2. In Netlify choose **Add new site → Import an existing project**.
3. Select the repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variable `VITE_API_BASE_URL` in Site configuration → Environment variables.
7. Deploy.

For GitHub Pages, use a Vite base path matching your repository name and configure SPA fallback routing. Netlify is the easier option for this React Router project.

## 7. Test checklist
- Search for an event.
- Select a category.
- Open event details.
- Register with valid details.
- Try an invalid email and empty fields.
- Register twice for the same event/email (should be blocked).
- Open My Events and cancel a registration.
- Refresh the browser to verify persistence.
- Open Dashboard and view the chart.
- Temporarily disconnect the API to see local demo fallback.
