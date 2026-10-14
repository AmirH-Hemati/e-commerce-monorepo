# 🛍️ E-Commerce Monorepo

### A Modern E-Commerce Project Built with Next.js and Turborepo

E-Commerce Monorepo is a web development project organized using a **Monorepo architecture**. It brings application code and shared packages together in a single repository, making development, code reuse, and project maintenance easier.

The project uses **Turborepo, npm Workspaces, Next.js, and TypeScript** to organize applications and shared tooling within a unified development environment.

## 🏗️ Architecture

### Monorepo Structure

The repository follows a workspace-based structure with separate application and package directories.

```text
e-commerce-monorepo/
├── apps/
│   ├── web/                  # Web application
│   └── ...                   # Additional applications
│
├── packages/
│   ├── ui/                   # Shared UI components
│   ├── eslint-config/        # Shared ESLint configuration
│   └── typescript-config/    # Shared TypeScript configuration
│
├── package.json              # Root scripts and workspaces
├── package-lock.json
└── turbo.json                # Turborepo task configuration
```

*The directory names above illustrate the intended organization. Refer to the actual repository for the exact workspace names.*

### Why Monorepo?

A monorepo allows multiple applications and shared packages to be maintained in one repository.

Key benefits include:

- **Code Reusability:** Share components and configurations across applications.
- **Centralized Dependency Management:** Manage workspace dependencies from the repository root.
- **Consistent Tooling:** Use shared TypeScript and ESLint configurations.
- **Simplified Development:** Run common development and build tasks through Turborepo.
- **Maintainability:** Keep related applications and packages within a unified codebase.

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### Monorepo & Development Tools
- [Turborepo](https://turbo.build/repo)
- npm Workspaces
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- Git & GitHub

## 📦 Shared Packages

The repository uses dedicated packages for common functionality and development configuration.

- **UI Package:** A shared component library for reusable UI elements.
- **ESLint Configuration:** Centralized linting rules across workspaces.
- **TypeScript Configuration:** Shared compiler configurations for consistent type checking.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — Version 18 or later, subject to the repository's package requirements.
- npm — The repository specifies npm as its package manager.

### 1. Clone the Repository

```bash
git clone https://github.com/AmirH-Hemati/e-commerce-monorepo.git
cd e-commerce-monorepo
```

### 2. Install Dependencies

Install dependencies for all configured workspaces:

```bash
npm install
```

### 3. Start Development

Run the development scripts through Turborepo:

```bash
npm run dev
```

### 4. Build Applications

Build the configured applications and packages:

```bash
npm run build
```

### 5. Run Code Quality Checks

Run the configured linting tasks:

```bash
npm run lint
```

Format supported files:

```bash
npm run format
```

Run TypeScript checks where configured:

```bash
npm run check-types
```

*Available commands depend on the scripts defined in the root and individual workspace `package.json` files.*

## 🎯 Project Goals

This project focuses on practical experience with:

- Monorepo architecture and workspace management.
- Next.js application development.
- TypeScript and shared configuration.
- Reusable UI components and package organization.
- Managing development and build tasks with Turborepo.
- Improving maintainability through code reuse and consistent tooling.

## 🔮 Future Improvements

Potential areas for further development include:

- Expanding e-commerce functionality.
- Adding or improving product browsing and shopping workflows.
- Improving shared UI components and design consistency.
- Adding automated unit and integration tests.
- Integrating CI/CD workflows.
- Improving application performance and deployment processes.

## 👨‍💻 Author

Developed as a web development project to explore modern frontend technologies, Monorepo architecture, and reusable development tooling.

---

**E-Commerce Monorepo — Building maintainable web applications with shared packages and modern development tools.**
