FROM node:18
COPY . .
RUN npm install
EXPOSE 4567
CMD ["/bin/sh"]
