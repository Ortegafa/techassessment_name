FROM node:20

WORKDIR /clean-arch

# 1. Copiar dependencias
COPY package*.json ./

# 2. Instalar dependencias
RUN npm install

# 3. Copiar código
COPY . .

# 4. Compilar
RUN npm run build

CMD ["npm", "start"]