FROM python:3.12

WORKDIR /ft_transcendence

RUN apt update && apt install -y \
    build-essential \
    libpq-dev \
    python3-dev

COPY requirements.txt /ft_transcendence/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY ./ /ft_transcendence/backend
CMD ["/ft_transcendence/backend/wait-for-it.sh", "db:5432", "--", "python", "backend/manage.py", "runserver", "0.0.0.0:8000"]
