docker run --rm \
--name mysql \
-e MYSQL_ALLOW_EMPTY_PASSWORD=1 \
-v $PWD/init_scripts:/docker-entrypoint-initdb.d \
-p 3306:3306 mysql