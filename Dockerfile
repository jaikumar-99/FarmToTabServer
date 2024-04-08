# Adjust NODE_VERSION as desired
# ARG NODE_VERSION=20.12.1
FROM node:20-alpine
# FROM node:${NODE_VERSION}-slim as base

WORKDIR /app

# LABEL fly_launch_runtime="Node.js"    
COPY "src" "/app/src"

COPY ["package.json","./"]

RUN npm install

COPY "sample.env" "/app/.env"


# Node.js app lives here


# Set production environment
# ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
# FROM base as build

# Install packages needed to build node modules
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
# COPY --link package-lock.json package.json ./
# RUN npm ci

# Copy application code
# COPY --link . .


# Final stage for app image
# FROM base

# Copy built application
# COPY --from=build /app /app

CMD npm run prod


# Start the server by default, this can be overwritten at runtime
EXPOSE 1999
