# 📖 THE MASTER AI ENGINEERING PLAYBOOK
**Internal Software House Engineering Manual v1.0**

*This playbook serves as the ultimate source of truth for developing modern, SaaS-grade web applications. Provide this document as context to any AI coding assistant before starting a new project to guarantee consistency, scalability, and enterprise standards.*

---

## 📖 1. AI Development Philosophy
The goal is not to write code for the sake of coding, but to ship reliable products rapidly using AI as a multiplier.
1. **Context is King:** Always provide the AI with the overarching business logic before asking it to write code.
2. **Iterative Generation:** Never ask the AI to build a full system at once. Break it down: Architecture -> Domain -> Data Layer -> UI.
3. **AI as a Co-Pilot, You as the Pilot:** The AI suggests, but the engineer dictates the architecture.
4. **Strict Refactoring:** Ask the AI to refactor for `Clean Architecture` and `SOLID` principles immediately after a feature works. Do not wait for technical debt to pile up.

---

## 🏗️ 2. Software Architecture Workflow
1. **Requirements Gathering:** Map out P0, P1, P2 features.
2. **Domain Modeling:** Define the core entities (e.g., User, Product, Order) without thinking about the UI or Database.
3. **System Design:** Decide on monolithic vs. microservices. (Default to Modular Monolith for new SaaS projects).
4. **Tech Stack Selection:** Stick to boring, proven technologies (React/Next.js, Node.js/Go, PostgreSQL). Avoid hype-driven development.
5. **Infrastructure:** Plan CI/CD pipelines and deployment strategies (Vercel, AWS, Docker) from Day 1.

---

## 🎨 3. UI/UX Rules
*Reference Systems: Material Design 3, Ant Design, IBM Carbon, Apple HIG.*
- **Core Philosophy:** "Design this interface as if it will be used daily by thousands of employees."
- **Speed & Accessibility:** WCAG 2.2 AA is mandatory. Contrast ratio > 4.5:1. Keyboard navigation must work flawlessly.
- **Anti-Patterns to Avoid:** No Glassmorphism, No Neumorphism, No arbitrary gradients, No huge floating shadows.
- **Components:** Left-aligned data tables, strict spacing scales (4px grid), consistent border radii (4px inputs, 8px cards).

---

## ⚙️ 4. Backend Engineering Rules
- **Statelessness:** Backend APIs must be completely stateless (JWT for authentication).
- **Fat Models, Skinny Controllers:** Business logic lives in the Service or Domain layer, NOT in the HTTP controllers.
- **Validation:** Always validate incoming requests at the boundary (using Zod or Joi) before it hits business logic.
- **Error Handling:** Standardize error responses (e.g., `{"status": 400, "code": "VALIDATION_ERROR", "message": "..."}`). Do not leak stack traces to the client.

---

## 🗄️ 5. Database Design Rules
- **PostgreSQL Default:** Use relational databases by default unless highly unstructured data demands NoSQL.
- **Naming Conventions:** Use `snake_case` for tables and columns. Table names must be plural (e.g., `users`, `orders`).
- **Primary Keys:** Use UUIDv4 or ULID for primary keys to prevent ID enumeration and aid distributed systems.
- **Soft Deletes:** Use an `is_deleted` boolean or `deleted_at` timestamp instead of physically deleting rows.
- **Indexing:** Always index foreign keys and columns used frequently in `WHERE` clauses.

---

## 🔌 6. REST API Design Standard
- **Nouns, not Verbs:** `/users` not `/getUsers`.
- **Plurals:** Always use plurals for resources (`/products/123`, not `/product/123`).
- **Versioning:** Include API versioning in the URL (`/api/v1/users`).
- **Pagination:** Always use pagination for collections (`?page=1&limit=20` or cursor-based pagination).
- **HTTP Methods:** `GET` (Read), `POST` (Create), `PUT` (Replace), `PATCH` (Partial Update), `DELETE` (Remove).

---

## 📂 7. Folder Structure Standard (Frontend Example)
```text
src/
├── assets/       # Static files
├── components/   # Shared UI components (Button, Input)
├── features/     # Feature-based modules (Auth, Dashboard)
│   ├── Auth/
│   │   ├── api/          # API requests for this feature
│   │   ├── components/   # Feature-specific components
│   │   └── hooks/        # Feature-specific hooks
├── hooks/        # Global custom hooks
├── layouts/      # Page wrappers (Sidebar layout, Auth layout)
├── pages/        # Route components
├── services/     # Global API config (Axios setup)
├── store/        # Global state (Zustand/Redux)
└── utils/        # Helper functions
```

---

## 🔒 8. Security Checklist
- [ ] Enforce HTTPS only.
- [ ] Implement Rate Limiting on public endpoints.
- [ ] Hash passwords using Argon2 or bcrypt (Salted).
- [ ] Prevent SQL Injection (Use ORMs or Parameterized Queries).
- [ ] Prevent XSS (Sanitize user inputs, use React/Modern frameworks which escape by default).
- [ ] Setup CORS strictly for allowed domains.
- [ ] Use HttpOnly, Secure cookies for storing JWTs (Avoid LocalStorage for sensitive tokens).

---

## 🧪 9. Testing Strategy
- **Unit Testing (Jest/Vitest):** Target pure functions, utils, and complex business logic (Services/Reducers). Goal: Fast, deterministic.
- **Integration Testing:** Test API endpoints with an in-memory database to ensure data flows correctly.
- **E2E Testing (Cypress/Playwright):** Write tests for core user journeys (Login -> Search -> Checkout). Keep these minimal as they are slow and brittle.

---

## 🚀 10. Deployment Checklist
- [ ] Environment variables configured in production securely.
- [ ] Database migrations run successfully.
- [ ] Production build optimized (tree-shaking, minification).
- [ ] CI/CD pipeline passes all tests before merge.
- [ ] Setup application monitoring and error tracking (e.g., Sentry).
- [ ] Verify CORS and Security Headers (Helmet).

---

## 🤖 11. AI Prompt Library
*(Sample from the 50+ Library)*
- **Refactoring:** "Review this [Language/Framework] file. Refactor it to adhere strictly to SOLID principles and Clean Architecture. Extract business logic into a separate service."
- **Code Review:** "Act as a strict Senior Engineer. Review this pull request. Look for memory leaks, O(n^2) complexities, and security flaws."
- **Unit Tests:** "Generate Jest unit tests for this utility function. Include edge cases, null inputs, and expected error throws."
- **Database Schema:** "Design a PostgreSQL schema for a [Domain] system. Include UUID primary keys, foreign key constraints, and necessary indexes."
- **Documentation:** "Generate comprehensive JSDoc/Docstrings for all functions in this file explaining parameters, return types, and potential side effects."

---

## 📋 12. Project Planning Workflow
1. Write the `PROJECT_VISION.md` (The "Why").
2. Write the `PRODUCT_REQUIREMENTS.md` (The "What").
3. Define `TARGET_USERS.md` and `USER_PERSONAS.md` (The "Who").
4. Establish the `INFORMATION_ARCHITECTURE.md`.
5. Break down PRD into Jira/Trello tickets using the Epics -> User Stories -> Tasks hierarchy.

---

## 💼 13. Git Workflow
- **Branching:** Use Trunk-Based Development or strict GitFlow (`main`, `develop`, `feature/xyz`, `bugfix/xyz`).
- **Commits:** Use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- **PRs:** Never merge directly to `main`. Require at least 1 approval. Squash and merge to keep history clean.

---

## 📄 14. Documentation Standard
- Every project must have a `README.md` containing: Description, Local Setup Instructions, Env Var definitions, and Build commands.
- Code must be self-documenting (clear variable names), but complex algorithms require block comments explaining *why*, not *what*.
- Maintain an `ARCHITECTURE.md` explaining the system design decisions (ADRs - Architecture Decision Records).

---

## 📏 15. Coding Standard
- Use ESLint and Prettier for automated formatting. No debates on tabs vs spaces; let the linter decide.
- Avoid magic numbers and strings. Extract them into constants.
- Keep functions small. If a function is over 50 lines, it probably does too much.
- Use explicit typings (TypeScript) wherever possible. Avoid `any`.

---

## 🏛️ 16. Clean Architecture
- **Domain Layer:** Entities and core business rules. Independent of any framework.
- **Application Layer:** Use cases (e.g., `CreateUserUseCase`). Orchestrates the domain.
- **Infrastructure Layer:** Database adapters, External API clients.
- **Presentation Layer:** UI, REST Controllers, GraphQL resolvers.
*Dependency Rule: Outer layers can depend on inner layers, but inner layers must NEVER depend on outer layers.*

---

## 🧩 17. SOLID Principles
1. **Single Responsibility (SRP):** A class/module should have one reason to change.
2. **Open/Closed (OCP):** Open for extension, closed for modification.
3. **Liskov Substitution (LSP):** Derived classes must be substitutable for their base classes.
4. **Interface Segregation (ISP):** Don't force clients to depend on interfaces they don't use.
5. **Dependency Inversion (DIP):** Depend on abstractions, not concretions.

---

## 🔄 18. Module Development Workflow
1. Write the Interface/Contract first.
2. Write a failing Unit Test based on the contract.
3. Write the minimal code to pass the test (TDD).
4. Refactor and optimize.
5. Integrate with the outer layers (UI/DB).

---

## ✅ 19. Code Review Checklist
- [ ] Does it meet the PRD requirements?
- [ ] Are SOLID principles maintained?
- [ ] Are there potential memory leaks (e.g., unclosed connections, unmounted listeners)?
- [ ] Is error handling robust? Are errors logged properly?
- [ ] Are new dependencies justified and audited?

---

## 📝 20. Portfolio Checklist
To guarantee an application is portfolio-ready:
- [ ] Hosted on a live, custom domain (or Vercel/Netlify).
- [ ] Comprehensive `README.md` with screenshots/GIFs.
- [ ] No console errors or warnings on page load.
- [ ] Lighthouse score > 90 across Performance, Accessibility, and Best Practices.
- [ ] Fully responsive on mobile, tablet, and desktop.

---

## 🎯 21. Interview Preparation Notes
- **Behavioral (STAR Method):** Situation, Task, Action, Result. Have 5 stories ready that cover leadership, conflict, technical challenges, failure, and success.
- **System Design:** Memorize patterns for Load Balancing, Caching (Redis), Database Sharding, and Microservices communication.
- **Frontend Concepts:** Deep dive into the Virtual DOM, React Lifecycle/Hooks, Event Delegation, and Browser Rendering pipeline.
- **Backend Concepts:** Understand the Node.js Event Loop, ACID properties, indexing algorithms (B-Trees), and REST vs GraphQL paradigms.
