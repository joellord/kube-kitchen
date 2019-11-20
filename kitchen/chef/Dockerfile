FROM node:10
WORKDIR /app
ENV PASTRY_FRIDGE /desserts
COPY package*.json /app/
RUN npm install
EXPOSE 3000
COPY index.js .
CMD ["node", "."]
