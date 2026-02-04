# Security Headers Setup für NGINX

## Problem

Die `public/_headers` Datei funktioniert nur auf **Netlify** und **Cloudflare Pages**, aber deine Seite läuft auf **NGINX**.

## Lösung 1: CSP via Meta-Tag ✅ (Bereits implementiert)

**Was funktioniert:**
- Content Security Policy (CSP) über `<meta>` Tag in BaseLayout.astro
- Wird im Browser angewendet
- Keine Server-Konfiguration nötig

**Was NICHT funktioniert:**
- Andere Headers (HSTS, X-Frame-Options, Permissions-Policy)
- CSP `frame-ancestors` Direktive (wird in Meta-Tags ignoriert)

**Status:** ✅ CSP als Meta-Tag bereits hinzugefügt

---

## Lösung 2: NGINX-Konfiguration 🔧 (Empfohlen)

### Schritt 1: NGINX-Config-Datei verwenden

Die Datei `nginx-headers.conf` enthält alle Security Headers.

#### Option A: Als Snippet einbinden
```nginx
# In deiner NGINX site config (z.B. /etc/nginx/sites-available/k0r37k1.dev)
server {
    listen 443 ssl http2;
    server_name k0r37k1.dev;

    # Security Headers einbinden
    include /path/to/nginx-headers.conf;

    # Rest deiner Config...
}
```

#### Option B: Direkt in Site-Config kopieren
```bash
# Kopiere den Inhalt von nginx-headers.conf
# direkt in dein server {} Block
```

### Schritt 2: NGINX neu laden
```bash
# Config testen
sudo nginx -t

# Wenn OK, neu laden
sudo systemctl reload nginx
```

### Schritt 3: Testen
```bash
# Lokal testen
curl -I https://k0r37k1.dev

# Oder online:
# https://securityheaders.com/?q=https://k0r37k1.dev
```

---

## Lösung 3: Hosting zu Netlify/Cloudflare wechseln (Optional)

Falls du keinen NGINX-Server-Zugriff hast, empfehle ich:

### **Netlify** (Einfachste Option)
```bash
# 1. Netlify Account erstellen
# 2. GitHub Repo verbinden
# 3. Build-Einstellungen:
#    Build command: npm run build
#    Publish directory: dist
# 4. Deploy!

# _headers Datei wird automatisch erkannt ✅
```

### **Cloudflare Pages**
```bash
# 1. Cloudflare Account + Pages aktivieren
# 2. GitHub Repo verbinden
# 3. Build-Einstellungen:
#    Build command: npm run build
#    Output directory: dist
# 4. Deploy!

# _headers Datei wird automatisch erkannt ✅
```

**Vorteile:**
- ✅ `_headers` Datei funktioniert out-of-the-box
- ✅ Kostenlos (für private Projekte)
- ✅ Automatisches SSL/TLS
- ✅ CDN global
- ✅ GitHub Auto-Deploy

---

## Aktuelle Header-Status

### ✅ Funktioniert bereits (via Meta-Tag):
- Content-Security-Policy (CSP)

### ❌ Fehlt noch (benötigt NGINX-Config):
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

---

## Testen

### Lokal (nach NGINX-Config):
```bash
curl -I https://k0r37k1.dev | grep -i "content-security\|x-frame\|strict-transport"
```

### Online Tools:
- **SecurityHeaders.com**: https://securityheaders.com/?q=https://k0r37k1.dev
- **Mozilla Observatory**: https://observatory.mozilla.org/analyze/k0r37k1.dev

**Ziel-Score:** A oder A+

---

## Kontakt zum Hoster

Falls du keinen Server-Zugriff hast, schicke diese Info an deinen Hoster:

```text
Subject: Security Headers für k0r37k1.dev aktivieren

Hallo,

ich möchte gerne Security Headers für meine Website k0r37k1.dev aktivieren.
Könntet ihr bitte die beigefügte NGINX-Konfiguration (nginx-headers.conf)
auf dem Server einspielen?

Die Headers sind wichtig für:
- Schutz gegen XSS-Attacken (CSP)
- Clickjacking-Prävention (X-Frame-Options)
- HTTPS-Enforcing (HSTS)
- Moderne Browser-Security (Permissions-Policy)

Vielen Dank!
```

Anhang: `nginx-headers.conf`

---

## Zusammenfassung

| Methode | Aufwand | Vollständigkeit | Status |
|---------|---------|-----------------|--------|
| **Meta-Tag CSP** | Niedrig | 50% | ✅ Implementiert |
| **NGINX-Config** | Mittel | 100% | ⏳ Benötigt Server-Zugriff |
| **Hosting-Wechsel** | Hoch | 100% | 💡 Optional |

**Empfehlung:** NGINX-Config anwenden (Lösung 2) für vollständigen Schutz.
