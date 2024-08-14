FROM alpine:3.12

RUN apk update && apk upgrade 
RUN apk add curl
RUN apk add nodejs-current npm

# RUN npm install -g npm@latest
# RUN npm install --save three
# RUN npm cache clean --force
# RUN npm install --save-dev vite 
# RUN npm install --save-dev esbuild 
# RUN npm i --save-dev @types/three 

RUN mkdir -p $HOME/ft_transcendence/srcs/
COPY ./* $HOME/ft_transcendence/srcs/

WORKDIR $HOME/ft_transcendence/srcs

EXPOSE 5173

# CMD ["npx", "vite", "--host"]