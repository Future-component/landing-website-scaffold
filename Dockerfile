FROM node:10 

ENV NODE_ENV production
ENV IN_OPEN_SHIFT 1
ENV BABEL_ENV=test

ADD . /home/node/code

RUN cd /home/node/code \
    && cnpm i \
    && npm run gen:config \
    && npm run build \
    && npm run upload:cdn \
    && chown -R node.node /home/node/code

WORKDIR /home/node/code

EXPOSE 8080

USER node
CMD ["node", "server.js"]
