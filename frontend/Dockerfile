FROM node:19

WORKDIR /frontend

COPY ./public ./public
COPY ./src ./src
COPY ./package.json ./package-lock.json ./.eslintrc.cjs ./index.html ./postcss.config.js ./tailwind.config.js ./tsconfig.json ./tsconfig.node.json ./vite.config.ts ./

RUN npm install

COPY .env .env
COPY ./dist ./dist

CMD ["npm", "run", "dev"]