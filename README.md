# Construir imagen de MySQL
docker build -t my-mysql-image .

# Ejecutar contenedor de la aplicación
docker run -p 3000:3000 --name school-app-container -d school-app-image

# Ejecutar contenedor de MySQL
docker run -p 3307:3306 --name school-mysql-container -d my-mysql-image  

# Ejecutar otro contenedor de la app linkado al de MySQL
docker run -p 3000:3000 --name app --link school-mysql-container:db -d school-app-image

# Abrir shell interactiva dentro del contenedor de la aplicación
docker exec -it app sh
