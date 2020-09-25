# Basic flask container

FROM alpine:3.12

ADD requirements.txt /home/app/
WORKDIR /home/app/

RUN apk update && \
    apk add --no-cache postgresql-dev gcc python3 python3-dev musl-dev openssl-dev libffi-dev && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    pip3 install wheel && \
    rm -r /root/.cache && \
    pip3 install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python3", "penpal.py"]