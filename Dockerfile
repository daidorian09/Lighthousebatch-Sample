###################################################
#
# Configuration
#
###################################################
ARG APPLICATION_USER=application
ARG NODE_VERSION=10.16.0

###################################################
#
# Build OS Setup Stage
#
###################################################
FROM node:${NODE_VERSION}-slim AS os

# Build dependencies for most nodejs builds
RUN apt-get update || : && apt-get install python make g++ -y
# RUN apt-get install \
#     python \
#     make \
#     g++

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
    
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production

#Install lighthousebatch globally
RUN npm install --unsafe-perm -g lighthouse-batch

# Bundle app source
COPY . .

# Expose port
EXPOSE 7071

# Check App status 
HEALTHCHECK --interval=5s --timeout=3s --retries=3 CMD curl --fail http://localhost:7071/api/monitoring/liveness || exit 1

CMD [ "node", "server.js" ]