# Security Policy

## SDSHAMMER Security Framework — HandyAndyAI Organisation

**Last Updated:** 2026-04-01  
**Policy Owner:** Andrew Murray (Founder)  
**Contact:** security@handyandyai.com

---

## Supported Versions

| Project | Supported Versions |
| --- | --- |
| MAPIT Estimator Pro | Latest release on `main` branch |
| Electrical-Estimating-Agents | Latest release on `main` branch |

All other repositories in this organisation are experimental or archived. Security updates are only actively maintained for the projects listed above.

---

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability in any HandyAndyAI repository, please report it responsibly.

**DO NOT** open a public GitHub issue for security vulnerabilities.

### How to Report

1. **Email:** Send details to **security@handyandyai.com**
2. **GitHub Private Vulnerability Reporting:** Use GitHub's built-in [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) feature on the affected repository

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Affected repository and version/branch
- Potential impact assessment
- Any suggested remediation (optional but appreciated)

### Response Timeline

| Stage | Target |
| --- | --- |
| Acknowledgement | Within 48 hours |
| Initial assessment | Within 5 business days |
| Remediation (Critical) | Within 7 days |
| Remediation (High) | Within 14 days |
| Remediation (Medium/Low) | Within 30 days |

We will keep you informed of progress and credit you in any public advisory (unless you prefer to remain anonymous).

---

## Security Practices

### Source Control

- All production code is protected with branch protection rules on `main`
- Direct pushes to `main` are prohibited — all changes go through pull requests
- Human-in-the-loop merge policy: the founder reviews and merges all PRs to `main`
- AI-assisted development (Claude Code) operates on `dev` branches only
- Commit signing is encouraged for all contributors

### Dependency Management

- **Dependabot** is enabled across all active repositories for security alerts and version updates
- **Socket.dev** is configured for supply chain attack detection
- Dependencies are triaged by severity:
  - **Critical:** Assessed and patched within 7 days
  - **High:** Assessed and patched within 14 days
  - **Medium/Low:** Batched into scheduled maintenance windows
- `npm audit` is run as part of the CI pipeline on every build
- Lock files (`package-lock.json`) are committed and reviewed

### Secret Management

- No API keys, tokens, passwords, or credentials are stored in source code
- All secrets are managed through environment variables and secure vaults
- GitHub secret scanning is enabled across the organisation
- API keys are rotated on a scheduled basis and immediately upon any suspected exposure
- Dedicated email-per-service strategy for leak tracing (planned)

### Authentication & Access Control

- Multi-factor authentication (MFA) is required for all organisation members
- YubiKey hardware security keys are used for primary authentication
- GitHub organisation membership is restricted to authorised personnel only
- Repository access follows principle of least privilege
- Personal Access Tokens (PATs) are scoped to minimum required permissions and rotated regularly

### Code Scanning

- GitHub CodeQL is enabled for static analysis on active repositories
- Automated security scanning runs on pull requests to `main`
- Findings are triaged alongside Dependabot alerts

### Incident Response

In the event of a security incident, we follow the SDSHAMMER Incident Response Protocol:

1. **ISOLATE** — Contain the threat, revoke compromised credentials immediately
2. **ASSESS** — Determine scope, affected systems, and data exposure
3. **ROTATE** — Full password and API key rotation for all potentially affected services
4. **REMEDIATE** — Patch vulnerability, clean affected systems, restore from known-good state
5. **DOCUMENT** — Log incident details, timeline, actions taken, lessons learned
6. **IMPROVE** — Update security policy with any new controls arising from the incident

---

## Scope

This security policy applies to all repositories within the **HandyAndyAI** GitHub organisation. Repositories under the **ALMMECHANICAL** personal account follow the same security practices but are managed separately.

---

## Acknowledgements

We appreciate the security research community and will acknowledge responsible disclosures in our release notes (with permission).

---

## Related Documents

- SDSHAMMER Security Policy v1.0 (Internal — not public)
- CONTRIBUTING.md (per repository)
- CODE_OF_CONDUCT.md (per repository)
