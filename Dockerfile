FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.3.1 --activate
WORKDIR /app

# install deps
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# build
FROM deps AS build
COPY . .
RUN pnpm build

# run
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "build"]
