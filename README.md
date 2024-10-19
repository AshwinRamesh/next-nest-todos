# Todolist App with NestJS <> NextJS

## Features
- Create a user
- Update a user
- Login/Logout via username/password (session store)
- Create a todolist
- Create todolist items
- Update todolist (& item) including marking as completed.
- Share a todolist with another user - enables Read/Add/Update operations on it.

## Infrastructure, Languages & Libraries
- Javascript + Typescript
- NestJS: Backend APIs
  - Postgres: Data store
    - MikroORM: JS library for DB
  - Redis: Session store + caching
- NextJS: Frontend
  - TailwindCSS
- Docker: run local Redis/PG

## Structure of NestJS Modules

- Modules are self contained parts of the application
- Modules should only export:
  - DTOs - Such that other modules can get use these types
  - Controller - for routes. This should be a thin wrapper around the main module service.
  - \<Module\>Service - The main service for this module. This can be imported into other modules via DI
- All other services etc. Should only be accessed within the module & should be encapsulated as impl details for that module

### Entities
- Since we only have one DB, we will co-locate all entities & provide the DB as a singleton
- TODO: Need to ensure we create a new context outside of HTTP usage.