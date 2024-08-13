FROM debian:buster

RUN apt update -y && apt upgrade -y ;\
	apt install -y npm ;\
	npm install --save three ;\
	npm install --save-dev vite ;\
	npm install --save-dev esbuild ;\
	npm i --save-dev @types/three ;\
	mkdir $HOME/ft_transcendence/

COPY ./srcs/* $HOME/ft_transcendence/

WORKDIR $HOME/ft_transcendence/srcs

CMD ["npx", "vite", "--host"]