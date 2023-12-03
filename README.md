<h1>Ejecución de contenedores con Docker</h1>

<h2>Construir imágenes</h2>

<p>Construye la imagen de la aplicación escolar</p>

<pre>
<code class="language-dockerfile">docker build -t school-app-image .</code>
</pre>

<p>Construye la imagen de MySQL</p>

<pre>
<code class="language-dockerfile">docker build -t my-mysql-image .</code> 
</pre>

<h2>Ejecutar contenedores</h2>

<p>Ejecuta el contenedor de la aplicación mapeando puertos y en segundo plano</p>

<pre>
<code>docker run -p 3000:3000 --name school-app-container -d school-app-image</code>
</pre>

<p>Ejecuta el contenedor de MySQL mapeando puertos y en segundo plano</p>

<pre>
<code>docker run -p 3307:3306 --name school-mysql-container -d my-mysql-image</code>
</pre>  

<h2>Conectar contenedores</h2>

<p>Ejecuta otro contenedor de la app vinculado al de MySQL</p>

<pre>
<code>docker run -p 3000:3000 --name app --link school-mysql-container:db -d school-app-image</code> 
</pre>

<h2>Acceder al contenedor</h2>
 
<p>Abre una shell interactiva dentro del contenedor de la aplicación</p>

<pre>
<code>docker exec -it app sh</code>
</pre>
