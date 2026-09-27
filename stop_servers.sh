#!/usr/bin/env bash
echo "Stopping MahaSkill AI servers and tunnels..."

pkill -f "uvicorn src.api:app" && echo "✓ Stopped Python Backend" || echo "- Python Backend was not running"
pkill -f "next-server|next dev" && echo "✓ Stopped Next.js Frontend" || echo "- Next.js Frontend was not running"
pkill -f "cloudflared tunnel" && echo "✓ Stopped Cloudflare Tunnel" || echo "- Cloudflare Tunnel was not running"

echo "All services stopped."
