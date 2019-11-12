FROM donhenton/docker-gulp-sass-node

ADD .  /var/www/app/current
EXPOSE 3000
WORKDIR /var/www/app/current
CMD ["pm2", "start", "processes.json", "--no-daemon"]