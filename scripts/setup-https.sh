#!/bin/bash
set -e

DOMAIN=${1:-midilover.com}
EMAIL=${2:-zac@midilover.com}

echo "=== midi-lover HTTPS Setup ==="
echo "Domain: $DOMAIN"
echo "Email:  $EMAIL"
echo ""

# Check DNS
echo "Checking DNS resolution..."
if ! host "$DOMAIN" > /dev/null 2>&1; then
    echo "ERROR: $DOMAIN does not resolve. Point your DNS A record to this server first."
    exit 1
fi

echo "DNS OK."
echo ""

# Stop services if running
docker compose down 2>/dev/null || true

# Request certificate using standalone mode
echo "Requesting SSL certificate..."
docker run --rm \
    -p 80:80 \
    -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
    -v "$(pwd)/certbot/www:/var/www/certbot" \
    certbot/certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    -d "$DOMAIN" \
    -d "www.$DOMAIN"

echo ""
echo "Certificate obtained."
echo ""

# Start all services
echo "Starting services..."
docker compose up -d --build

echo ""
echo "=== Setup Complete ==="
echo "Site should be live at https://$DOMAIN"
echo ""
echo "Post-setup checklist:"
echo "  - Verify https://$DOMAIN loads correctly"
echo "  - Check certificate: curl -vI https://$DOMAIN 2>&1 | grep subject"
echo "  - Certbot auto-renewal is running in background"
