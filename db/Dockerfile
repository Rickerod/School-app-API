FROM mysql:latest

# Setear variable de entorno de contraseña root
ENV MYSQL_ROOT_PASSWORD "root"

# Crear volumen para archivos de inicializacion BD 
VOLUME /docker-entrypoint-initdb.d

# Copiar script SQL a volumen de inicialización
COPY db2.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
