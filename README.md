<img src="./Docs/Open5GS-Diagram.pdf" width="100%">
# 5G Network Configuration Management

A 5G Network Configuration Management and NMS-oriented project developed to explore different approaches for managing, processing, and controlling network configuration data.

Each branch of this repository represents a different implementation model or development approach for the system.

---

## Overview

This project focuses on the development of a configuration management system for 5G network environments.

The main goal is to provide a structured environment for working with network configuration files and exploring different architectural and implementation approaches.

The project is organized around multiple Git branches, where each branch represents a specific implementation model.

```text
                         5G NMS
                           │
                           ▼
                Network Configuration
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        Configuration   Validation    Management
           Files
             │
             ▼
       Network Elements
        BBU / RRU / gNB
```

---

## Project Goals

* Manage 5G network configuration files
* Explore different configuration management models
* Provide a foundation for NMS integration
* Separate configuration processing from business logic
* Experiment with different software architecture approaches
* Maintain different implementations using Git branches

---

## Repository Structure

The repository contains multiple branches, with each branch representing a different implementation or architectural approach.

| Branch         | Description                       |
| -------------- | --------------------------------- |
| `BBDH`         | BBDH implementation               |
| `BBU-V2`       | BBU-oriented implementation       |
| Other branches | Alternative implementation models |

> The branch list may evolve as new implementation models are developed.

---

## Network Environment

The project is designed around a 5G network environment and can be integrated with network elements such as:

* BBU
* RRU
* gNB
* NMS

A simplified communication flow can be represented as:

```text
             NMS
              │
              ▼
       Configuration Manager
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
      BBU           RRU
       │
       ▼
      gNB
```

---

## Configuration Management

The system is intended to handle different stages of configuration management:

```text
Configuration File
        │
        ▼
     Loading
        │
        ▼
    Processing
        │
        ▼
    Validation
        │
        ▼
   Configuration
    Management
        │
        ▼
     Network
      Element
```

Depending on the implementation branch, these stages may be handled differently.

---

## Technology Stack

The project is currently built using:

* PHP
* Laravel
* MySQL / MariaDB
* Laravel Modules
* REST API
* Git

---

## Architecture

The project follows a modular Laravel structure.

```text
app/
├── Modules/
│   ├── ...
│   └── ...
│
├── config/
├── database/
├── routes/
├── resources/
└── tests/
```

The modular structure allows individual parts of the system to be developed and maintained independently.

---

## Development Approach

One of the main purposes of this repository is to compare different implementation approaches.

Instead of maintaining every approach inside a single codebase, each approach is isolated in its own Git branch.

This makes it possible to:

* Compare implementations
* Experiment without affecting other models
* Track architectural changes
* Test different solutions
* Preserve previous implementations

---

## Documentation

Additional project documentation is available in the [`Docs`](./Docs) directory.

### Project Documentation

* [Technical Documentation](./Docs/)
* [Project Report](./Docs/project-report.pdf)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/HosseinMohammadiSoftDev/network-config-5G-NMS.git
cd network-config-5G-NMS
```

Install PHP dependencies:

```bash
composer install
```

Install frontend dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure the database in `.env`, then run:

```bash
php artisan migrate
```

Start the development server:

```bash
php artisan serve
```

---

## Branch-Based Development

To inspect a specific implementation:

```bash
git branch -a
```

Switch to a branch:

```bash
git switch <branch-name>
```

For example:

```bash
git switch BBDH
```

Each branch should be considered an independent implementation model of the overall system.

---

## Project Status

This repository is an ongoing development and experimentation project.

New implementation models, architectural changes, and network configuration features may be added over time.

---

## Author

**Hossein Mohammadi**

GitHub: [HosseinMohammadiSoftDev](https://github.com/HosseinMohammadiSoftDev)

---

This project is intended primarily for development, experimentation, and educational purposes.
