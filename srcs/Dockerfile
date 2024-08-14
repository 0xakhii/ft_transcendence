FROM debian:buster

RUN apt update -y && apt upgrade -y 
RUN apt install -y npm curl
RUN npm install -g npm@latest

RUN npm install --save three 
RUN npm install --save-dev vite 
RUN npm install --save-dev esbuild 
RUN npm i --save-dev @types/three 

RUN mkdir -p $HOME/ft_transcendence/srcs
COPY ./* $HOME/ft_transcendence/srcs

WORKDIR $HOME/ft_transcendence/srcs

CMD ["npx", "vite"] 
