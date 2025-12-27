# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Set environment variable for API URL (build-time)
# This will be overridden by docker-compose
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy application code
COPY . .

# Build the React app
RUN npm run build

# Production stage - serve with nginx
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
