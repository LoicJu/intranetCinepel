FROM ubuntu
MAINTAINER loic.jurasz@he-arc.ch
ENV TZ=Europe/Zurich
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /opt
COPY . .
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y python3 python3-pip npm git
RUN pip3 install -r requirements.txt
RUN npm install ./intranetcinepel/intranet_frontend_app/
