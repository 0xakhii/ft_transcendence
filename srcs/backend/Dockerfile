FROM python:3.9

WORKDIR /ft_transcendence

COPY requirements.txt /ft_transcendence/
RUN apt update -y && apt upgrade -y
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY ./srcs/ /ft_transcendence/

CMD ["python", "back.py", "runserver", "0.0.0.0:8000"]
