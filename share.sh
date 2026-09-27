#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

echo "=== Starting MahaSkill AI Stack ==="

# 1. Start Python Backend (FastAPI on port 8000)
if ! curl -s http://127.0.0.1:8000/api/health >/dev/null 2>&1; then
    echo "-> Starting Python Backend on port 8000..."
    nohup .venv/bin/uvicorn src.api:app --host 0.0.0.0 --port 8000 > /tmp/backend.log 2>&1 &
    sleep 2
else
    echo "-> Python Backend already running on port 8000."
fi

# 2. Start Next.js Frontend (Port 3000)
if ! curl -s http://127.0.0.1:3000 >/dev/null 2>&1; then
    echo "-> Starting Next.js Frontend on port 3000..."
    cd "$DIR/frontend/newprob"
    nohup npm run dev -- -H 0.0.0.0 -p 3000 > /tmp/frontend.log 2>&1 &
    cd "$DIR"
    echo "Waiting for frontend to become ready..."
    until curl -s http://127.0.0.1:3000 >/dev/null 2>&1; do
        sleep 1
    done
else
    echo "-> Next.js Frontend already running on port 3000."
fi

# 3. Start Cloudflare Tunnel
echo "-> Starting Cloudflare Tunnel..."
pkill -f "cloudflared tunnel --url http://127.0.0.1:3000" || true
nohup cloudflared tunnel --url http://127.0.0.1:3000 > /tmp/cloudflared.log 2>&1 &

echo "Waiting for public tunnel URL..."
for i in {1..20}; do
    TUNNEL_URL=$(grep -o 'https://[-a-z0-9.]*\.trycloudflare\.com' /tmp/cloudflared.log | head -n 1 || true)
    if [ -n "$TUNNEL_URL" ]; then
        break
    fi
    sleep 1
done

LOCAL_IP=$(ip -4 addr show scope global | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | head -n 1 || true)

echo ""
echo "=========================================================="
echo "🎉 Server is LIVE and ready to share!"
echo "=========================================================="
if [ -n "$TUNNEL_URL" ]; then
    echo "🌐 Public Link (Anywhere in the world):"
    echo "   $TUNNEL_URL"
else
    echo "⚠️ Cloudflare tunnel URL is still generating. Check /tmp/cloudflared.log"
fi
if [ -n "$LOCAL_IP" ]; then
    echo ""
    echo "🏠 Local WiFi Link (Friends on same Wi-Fi/Hotspot):"
    echo "   http://$LOCAL_IP:3000"
fi
echo ""
echo "💻 Local Machine:"
echo "   http://localhost:3000"
echo "=========================================================="
