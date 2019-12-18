FROM python:3.8-slim

ENV PYTHONUNBUFFERED=true
ENV PYTHONDONTWRITEBYTECODE=true

COPY requirements.txt /

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install gcc -y \
    && pip install pip --upgrade && pip install  -r requirements.txt \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

EXPOSE 8000


CMD uvicorn main:app --reload --host 0.0.0.0