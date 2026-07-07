# pnpm 11 requiere Node >= 22.13 (node:sqlite); 22 es además el default de Vercel.
FROM node:22-alpine AS builder
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
# packageManager en package.json fija la versión de pnpm que corepack activa.
RUN corepack enable
# pnpm-workspace.yaml trae allowBuilds (esbuild/sharp); sin él, pnpm 11
# bloquea sus build scripts y el install falla.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
COPY . .
# SITE define la URL canónica del build (--build-arg SITE=https://midominio.com)
ARG SITE
ENV SITE=${SITE}
RUN pnpm build

FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
