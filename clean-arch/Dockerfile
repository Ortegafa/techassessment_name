FROM node:20-alpine AS development

WORKDIR /clean-arch

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY . .

RUN npm install
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build

# =========================

FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /clean-arch

COPY --from=development /clean-arch/package*.json ./
RUN npm install --omit=dev

COPY --from=development /clean-arch/dist ./dist
COPY --from=development /clean-arch/prisma ./prisma

# Generate Prisma client against production node_modules
RUN npx prisma generate --schema=prisma/schema.prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy --schema=prisma/schema.prisma && node dist/src/main.js"]