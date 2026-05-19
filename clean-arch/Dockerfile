FROM node:20 AS builder

WORKDIR /clean-arch

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate   
RUN npm run build

# =========================

FROM node:20

WORKDIR /clean-arch

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /clean-arch/dist ./dist
COPY --from=builder /clean-arch/prisma ./prisma

RUN npx prisma generate   

CMD ["npm", "start"]