FROM python:3.10-slim

WORKDIR /backend

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

RUN pip install --upgrade pip
COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "main.py"]