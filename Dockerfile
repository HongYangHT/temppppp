FROM nginx
MAINTAINER zhaomi <zhaomi@movee.cn>

ENV TZ=PRC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#复制文件
COPY ./default.conf /etc/nginx/conf.d
COPY ./dist /var/www/html

WORKDIR /var/www/html
