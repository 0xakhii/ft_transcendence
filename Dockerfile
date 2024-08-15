FROM node:18-alpine

RUN apk update && apk upgrade 
RUN apk add curl
RUN apk add nodejs-current npm
RUN npm cache clean --force && rm -rf /usr/local/lib/node_modules/

RUN mkdir -p /ft_transcendence/srcs/
COPY ./srcs/ /ft_transcendence/srcs/
COPY ./conf/conf.sh /conf.sh
WORKDIR /ft_transcendence/srcs

RUN chmod +x /conf.sh
EXPOSE 5173

ENTRYPOINT [ "/bin/sh", "/conf.sh" ]