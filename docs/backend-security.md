# SAASX Backend Security Documentation

## Current Security Protections

### 1. HTTP Headers (Helmet)
The backend uses `helmet` to set secure HTTP response headers, mitigating well-known web vulnerabilities such as XSS, clickjacking, and MIME-sniffing.

### 2. Cross-Origin Resource Sharing (CORS)
CORS is explicitly configured via the `CORS_ORIGIN` environment variable. By default, it supports multiple comma-separated origins (e.g., `http://localhost:3000, https://saasx.com`). The wildcard `*` origin is forbidden.

### 3. Rate Limiting
To prevent abuse and DDoS attacks, two separate rate limits are enforced using `express-rate-limit`:
- **General Rate Limit:** Applies to all `/api` endpoints (e.g., 100 requests per 15 minutes).
- **AI Generation Rate Limit:** Stricter limit applied specifically to the `/api/generate-workflow` endpoint (e.g., 20 requests per hour) to prevent AI provider token exhaustion and financial abuse.

### 4. Input Validation (Zod)
All endpoints enforce strict input validation using `zod` schemas. The `validateRequest` middleware ensures that only requests with the expected payload structure, data types, and reasonable constraints reach the controllers.
- `promptAr` is strictly limited in length to mitigate basic prompt injection overflow.
- Numeric constraints are enforced on mock payment amounts.
- Webhook paths are sanitized and length-checked.

### 5. Request Body Constraints
The `express.json` parser is configured with a strict `limit: '1mb'` to prevent payload exhaustion attacks.

### 6. Error Handling
A standardized global error handler (`middleware/error-handler.ts`) ensures that internal application errors and stack traces are **never** leaked to clients in production. All API errors follow a predictable format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Public error message"
  }
}
```

### 7. Environment Validation
Server startup halts immediately if critical environment variables (like `PORT` or `CORS_ORIGIN`) are malformed, utilizing Zod for runtime configuration validation.

## Environment Variables
- `NODE_ENV`: 'development' | 'production' | 'test'
- `PORT`: (Number) Application port.
- `CORS_ORIGIN`: (String) Comma-separated allowed origins.
- `GEMINI_API_KEY`: (String, Optional) Key for Google Gemini.
- `API_RATE_LIMIT_WINDOW_MS`: (Number) General window size in ms.
- `API_RATE_LIMIT_MAX`: (Number) Max general requests per window.
- `AI_RATE_LIMIT_WINDOW_MS`: (Number) AI window size in ms.
- `AI_RATE_LIMIT_MAX`: (Number) Max AI requests per window.

## Remaining Known Security Risks
- **Prompt Injection:** Validating string length does not stop semantic prompt injection. An attacker could still craft a prompt instructing the AI to output malicious JSON.
- **SSRF in Webhooks:** The `/api/n8n/webhook-test` is currently a mock. If it is changed to execute actual outbound HTTP requests, strict domain whitelisting must be implemented.
- **Hardcoded File Paths:** The system generator outputs a Docker configuration containing a hardcoded `D:\saasx-data\n8n` path, which could pose a risk if the generation pipeline assumes local system access.

## Intentionally Deferred to Later Phases
- **Authentication & Authorization:** No user identity verification or role-based access control (RBAC) exists yet.
- **Real Payment Gateways:** Current ZainCash and FastPay integrations are pure mocks and lack cryptographic signature verification.
- **OpenRouter/Supabase Integrations:** The final AI provider and database implementations have been postponed.
