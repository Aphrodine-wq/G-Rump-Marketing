# WAF (Web Application Firewall) Configuration

This document provides guidance for deploying G-Rump behind a Web Application Firewall in production environments.

## Overview

A WAF protects your application from common web exploits and attacks. We recommend deploying G-Rump behind a WAF for production use.

## Recommended WAF Providers

### Cloudflare WAF

1. **Setup**
   ```
   1. Add your domain to Cloudflare
   2. Enable Cloudflare WAF (Pro plan or higher)
   3. Configure the following managed rulesets:
      - Cloudflare Managed Ruleset
      - OWASP Core Ruleset
   ```

2. **Recommended Rules**
   ```yaml
   # Rate Limiting
   - name: API Rate Limit
     expression: (http.request.uri.path contains "/api/")
     action: rate_limit
     characteristics:
       - ip.src
     period: 60
     requests_per_period: 100
     mitigation_timeout: 600

   # Bot Management
   - name: Block Bad Bots
     expression: (cf.client.bot) and not (cf.bot_management.verified_bot)
     action: challenge

   # Geographic Restrictions (if needed)
   - name: Geo Block
     expression: (ip.geoip.country in {"XX" "YY"})
     action: block
   ```

3. **Page Rules**
   ```
   - URL: *example.com/api/*
     Settings:
       - Security Level: High
       - Browser Integrity Check: On
       - Challenge Passage: 30 minutes
   ```

### AWS WAF

1. **Create Web ACL**
   ```bash
   aws wafv2 create-web-acl \
     --name grump-waf \
     --scope REGIONAL \
     --default-action Allow={} \
     --rules file://waf-rules.json
   ```

2. **waf-rules.json**
   ```json
   [
     {
       "Name": "AWSManagedRulesCommonRuleSet",
       "Priority": 1,
       "Statement": {
         "ManagedRuleGroupStatement": {
           "VendorName": "AWS",
           "Name": "AWSManagedRulesCommonRuleSet"
         }
       },
       "OverrideAction": { "None": {} },
       "VisibilityConfig": {
         "SampledRequestsEnabled": true,
         "CloudWatchMetricsEnabled": true,
         "MetricName": "CommonRuleSet"
       }
     },
     {
       "Name": "AWSManagedRulesKnownBadInputsRuleSet",
       "Priority": 2,
       "Statement": {
         "ManagedRuleGroupStatement": {
           "VendorName": "AWS",
           "Name": "AWSManagedRulesKnownBadInputsRuleSet"
         }
       },
       "OverrideAction": { "None": {} },
       "VisibilityConfig": {
         "SampledRequestsEnabled": true,
         "CloudWatchMetricsEnabled": true,
         "MetricName": "KnownBadInputs"
       }
     },
     {
       "Name": "RateLimitRule",
       "Priority": 3,
       "Statement": {
         "RateBasedStatement": {
           "Limit": 2000,
           "AggregateKeyType": "IP"
         }
       },
       "Action": { "Block": {} },
       "VisibilityConfig": {
         "SampledRequestsEnabled": true,
         "CloudWatchMetricsEnabled": true,
         "MetricName": "RateLimit"
       }
     },
     {
       "Name": "SQLInjectionRule",
       "Priority": 4,
       "Statement": {
         "ManagedRuleGroupStatement": {
           "VendorName": "AWS",
           "Name": "AWSManagedRulesSQLiRuleSet"
         }
       },
       "OverrideAction": { "None": {} },
       "VisibilityConfig": {
         "SampledRequestsEnabled": true,
         "CloudWatchMetricsEnabled": true,
         "MetricName": "SQLInjection"
       }
     }
   ]
   ```

3. **Associate with ALB**
   ```bash
   aws wafv2 associate-web-acl \
     --web-acl-arn arn:aws:wafv2:region:account:regional/webacl/grump-waf/id \
     --resource-arn arn:aws:elasticloadbalancing:region:account:loadbalancer/app/grump-alb/id
   ```

### NGINX ModSecurity

For self-hosted deployments with NGINX:

1. **Install ModSecurity**
   ```bash
   apt-get install libmodsecurity3 libmodsecurity-dev
   ```

2. **nginx.conf**
   ```nginx
   load_module modules/ngx_http_modsecurity_module.so;

   http {
       modsecurity on;
       modsecurity_rules_file /etc/nginx/modsec/main.conf;

       server {
           listen 443 ssl http2;
           server_name grump.example.com;

           location /api/ {
               modsecurity_rules '
                   SecRule REQUEST_URI "@contains /api/" \
                       "id:1001,phase:1,deny,status:403,msg:\'Blocked by WAF\'"
               ';
               proxy_pass http://backend:3000;
           }
       }
   }
   ```

3. **modsec/main.conf**
   ```
   Include /etc/nginx/modsec/modsecurity.conf
   Include /etc/nginx/modsec/crs/crs-setup.conf
   Include /etc/nginx/modsec/crs/rules/*.conf

   # Custom Rules
   SecRule REQUEST_HEADERS:Content-Type "!@contains application/json" \
       "id:2001,phase:1,deny,status:415,msg:'Invalid Content-Type'"
   
   SecRule REQUEST_BODY "@rx <script>" \
       "id:2002,phase:2,deny,status:403,msg:'XSS Attempt'"
   ```

## Rate Limiting Configuration

### Recommended Limits

| Endpoint | Requests/min | Burst |
|----------|-------------|-------|
| `/api/chat` | 30 | 5 |
| `/api/ship` | 10 | 2 |
| `/api/codegen` | 20 | 3 |
| `/auth/*` | 10 | 2 |
| `/api/*` (default) | 100 | 20 |

### Implementation

The application has built-in rate limiting, but WAF-level rate limiting provides:
- Earlier rejection (saves server resources)
- DDoS mitigation at edge
- Global rate limiting across instances

## IP Allowlisting/Blocklisting

### Cloudflare IP Access Rules
```
# Allow office IP
allow 203.0.113.0/24

# Block known bad actors
block 192.0.2.0/24
```

### AWS WAF IP Sets
```bash
aws wafv2 create-ip-set \
  --name grump-blocked-ips \
  --scope REGIONAL \
  --ip-address-version IPV4 \
  --addresses "192.0.2.0/24" "198.51.100.0/24"
```

## Bot Protection

### Legitimate Bots to Allow
- Googlebot
- Bingbot
- Monitoring services (UptimeRobot, Pingdom)
- CI/CD systems

### Bots to Block/Challenge
- Scrapers
- Vulnerability scanners
- Credential stuffing bots
- AI training crawlers (unless permitted)

## Logging and Monitoring

1. **Enable WAF Logging**
   - Cloudflare: Logpush to S3/R2
   - AWS WAF: CloudWatch Logs or Kinesis Firehose

2. **Alert on**
   - Rate limit triggers (>10/min)
   - SQL injection attempts
   - XSS attempts
   - Blocked countries accessing protected resources

3. **Dashboard Metrics**
   - Requests blocked by rule
   - Top blocked IPs
   - Attack patterns over time

## Testing WAF Rules

Before enabling blocking mode:

1. **Monitor Mode First**
   ```
   Set all rules to "Log" or "Count" mode
   Monitor for 7 days
   Review false positives
   ```

2. **Test Common Attacks**
   ```bash
   # SQL Injection (should be blocked)
   curl "https://grump.example.com/api/search?q='; DROP TABLE users;--"

   # XSS (should be blocked)
   curl "https://grump.example.com/api/search?q=<script>alert(1)</script>"

   # Path Traversal (should be blocked)
   curl "https://grump.example.com/api/files?path=../../etc/passwd"
   ```

3. **Verify Legitimate Traffic**
   ```bash
   # Normal API request (should pass)
   curl -X POST "https://grump.example.com/api/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, world!"}'
   ```

## Maintenance

- Review WAF logs weekly
- Update rule sets monthly
- Test after major application updates
- Document any custom rule changes
