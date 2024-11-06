# Etapa 1: Construção
FROM node:18 AS builder

# Definindo o diretório de trabalho no contêiner
WORKDIR /app

# Copiando os arquivos de configuração do projeto para o contêiner
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante dos arquivos da aplicação
COPY . .

# Construindo a aplicação NestJS
RUN npm run build

# Etapa 2: Execução
FROM node:18

# Definindo o diretório de trabalho no contêiner
WORKDIR /app

# Copiando apenas os arquivos necessários da etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Definindo a variável de ambiente para produção
ENV NODE_ENV=production

# Expondo a porta que a aplicação utilizará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
