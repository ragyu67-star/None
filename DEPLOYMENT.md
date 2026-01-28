# 🚀 Deployment Guide

This guide covers different ways to deploy Misty Volume Bot.

## Table of Contents
- [Local Deployment](#local-deployment)
- [VPS Deployment](#vps-deployment)
- [Docker Deployment](#docker-deployment)
- [Cloud Deployment](#cloud-deployment)

## Local Deployment

### Prerequisites
- Node.js 16+ installed
- Git installed
- Solana wallet with funds

### Steps

1. **Clone and setup**
```bash
git clone https://github.com/yourusername/misty-volume-bot.git
cd misty-volume-bot
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
nano .env  # Edit with your configuration
```

3. **Build and run**
```bash
npm run build
npm start
```

4. **Access dashboard**
```
http://localhost:5000
```

## VPS Deployment

### Recommended Providers
- DigitalOcean ($5-10/month)
- Linode ($5-10/month)
- Vultr ($5-10/month)
- AWS EC2 (Free tier available)

### Setup on Ubuntu 22.04

1. **Update system**
```bash
sudo apt update && sudo apt upgrade -y
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version
```

3. **Clone and configure**
```bash
git clone https://github.com/yourusername/misty-volume-bot.git
cd misty-volume-bot
npm install
cp .env.example .env
nano .env  # Configure
```

4. **Build project**
```bash
npm run build
```

5. **Install PM2 for process management**
```bash
sudo npm install -g pm2
```

6. **Start with PM2**
```bash
pm2 start dist/index.js --name misty-bot
pm2 save
pm2 startup
```

7. **Setup firewall**
```bash
sudo ufw allow 5000/tcp
sudo ufw allow ssh
sudo ufw enable
```

8. **Access via public IP**
```
http://your-vps-ip:5000
```

### PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs misty-bot

# Restart
pm2 restart misty-bot

# Stop
pm2 stop misty-bot

# Delete
pm2 delete misty-bot
```

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  misty-bot:
    build: .
    container_name: misty-volume-bot
    restart: unless-stopped
    ports:
      - "5000:5000"
    env_file:
      - .env
    volumes:
      - ./logs:/app/logs
    networks:
      - misty-network

networks:
  misty-network:
    driver: bridge
```

### Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

## Cloud Deployment

### Heroku

1. **Install Heroku CLI**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login and create app**
```bash
heroku login
heroku create misty-volume-bot
```

3. **Set environment variables**
```bash
heroku config:set PRIVATE_KEY=your_key
heroku config:set RPC_ENDPOINT=your_endpoint
heroku config:set TOKEN_ADDRESS=your_token
```

4. **Deploy**
```bash
git push heroku main
```

5. **Open app**
```bash
heroku open
```

### Railway

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Initialize project**
```bash
railway login
railway init
```

3. **Add variables**
```bash
railway variables set PRIVATE_KEY=your_key
railway variables set RPC_ENDPOINT=your_endpoint
```

4. **Deploy**
```bash
railway up
```

### AWS EC2

1. **Launch EC2 instance**
   - Ubuntu 22.04 LTS
   - t2.micro or larger
   - Open port 5000 in security group

2. **Connect via SSH**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

3. **Follow VPS deployment steps above**

### Google Cloud Run

1. **Install gcloud CLI**
```bash
curl https://sdk.cloud.google.com | bash
```

2. **Build and push Docker image**
```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/misty-bot
```

3. **Deploy to Cloud Run**
```bash
gcloud run deploy misty-bot \
  --image gcr.io/PROJECT-ID/misty-bot \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Nginx Reverse Proxy

To access via domain name:

1. **Install Nginx**
```bash
sudo apt install nginx
```

2. **Create config**
```bash
sudo nano /etc/nginx/sites-available/misty-bot
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable site**
```bash
sudo ln -s /etc/nginx/sites-available/misty-bot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Monitoring

### Setup logging

```bash
# PM2 logs
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# View logs
pm2 logs --lines 100
```

### Health checks

Create a simple health endpoint or use:
```bash
# Check if bot is running
curl http://localhost:5000/api/status

# Monitor with cron
crontab -e
```

Add:
```
*/5 * * * * curl -f http://localhost:5000/api/status || systemctl restart misty-bot
```

## Security Best Practices

1. **Use environment variables** - Never hardcode secrets
2. **Firewall** - Only open necessary ports
3. **SSH keys** - Disable password authentication
4. **Updates** - Keep system and dependencies updated
5. **Backups** - Regular backups of configuration
6. **Monitoring** - Set up alerts for failures
7. **Rate limiting** - Implement API rate limiting
8. **HTTPS** - Always use SSL in production

## Troubleshooting

### Bot won't start
```bash
# Check logs
pm2 logs misty-bot

# Verify environment variables
cat .env

# Test build
npm run build
```

### Port already in use
```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>
```

### Out of memory
```bash
# Increase Node.js memory
pm2 start dist/index.js --name misty-bot --node-args="--max-old-space-size=4096"
```

## Backup & Recovery

### Backup configuration
```bash
# Backup .env file
cp .env .env.backup

# Backup entire project
tar -czf misty-bot-backup.tar.gz misty-volume-bot/
```

### Recovery
```bash
# Restore from backup
tar -xzf misty-bot-backup.tar.gz
cd misty-volume-bot
npm install
npm run build
pm2 restart misty-bot
```

---

Need help? Check [GitHub Issues](https://github.com/yourusername/misty-volume-bot/issues)
