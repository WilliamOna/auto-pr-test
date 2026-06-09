# auto-pr-test

Test repo for auto PR agent workflow. This repository is used to validate and demonstrate automated pull request creation and management using AI-powered agents. It serves as a sandbox for testing end-to-end CI/CD workflows, issue-driven development, and autonomous code modification pipelines.

## Workflow Diagram

```mermaid
graph TD
    A[Issue Created] --> B[Agent Detects Issue]
    B --> C[Agent Clones Repo]
    C --> D[Agent Implements Changes]
    D --> E[Agent Creates PR]
    E --> F[CI/CD Runs Checks]
    F --> G{Checks Pass?}
    G -->|Yes| H[PR Merged]
    G -->|No| I[Agent Revisits]
    I --> D
```
