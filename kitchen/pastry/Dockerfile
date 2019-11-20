FROM node:10-alpine
RUN mkdir -p /app/desserts
ENV PASTRY_FRIDGE /desserts
COPY index.js /app
CMD ["node", "/app"]