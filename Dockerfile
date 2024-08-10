FROM debian:buster

RUN apt update -y && apt upgrade -y &&\
	mkdir $HOME/ft_transcendence/

COPY ./srcs/* $HOME/ft_transcendence/