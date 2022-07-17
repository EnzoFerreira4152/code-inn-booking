# CODE-INN v1.0  https://code-inn.herokuapp.com

(Este repositorio tiene la intención de mostrar el desarrollo tanto del backend como el frontend realizados en el primer año del curso 'Certified Tech Developer' de Digital House. Ambas partes fueron inicialmente desplegadas en instancias de AWS pero al finalizar ese tramo de la cursada las cuentas van a ser o ya fueron dadas de baja, por lo tanto todo el deploy en el que funciona actualmente la aplicación está hecha a través de Heroku, para poder contar con una versión libre y disponible para mostrar)

## 🛎General🛎
:rocket: **CODE-INN** :rocket:

- Code-inn es una plataforma de booking online que le permite a un usuario crear una cuenta, navegar distintas opciones de hospedaje reales y reservar una estadía donde más le guste. Consiste de una homepage que renderiza productos aleatorios brindados por la instancia RDS de base de datos, filtros por categorías programados desde el backend al igual que de un buscador por ciudades y/o fechas disponibles delimitados desde el front. En cuanto a la configuración de usuarios, esta fue realizada con Spring Security y permite un registro con contraseñas encriptadas además de un log-in desde donde un usuario creado previamente puede gestionar sus reservas de productos.

- El objetivo de este proyecto es simular una webapp de reserva de hospedajes variados tal como booking o trivago (con la excepción de la integración de plataformas de pago online) en pos de demostrar los diversos conocimientos de html, css, React, Java, Sql, IaC y AWS adquiridos a lo largo del primer año de cursada en el programa Certified Tech Developer de Digital House. A su vez, buscamos crear un producto user-friendly y estéticamente agradable que podamos usar como ejemplo a la hora de presentar nuestras capacidades durante búsquedas profesionales de empleo.

:couple: **EL EQUIPO** :couple:

- :skull: **Cam Gauto** :skull: : 
    - Habiendo arrancado con tareas de back end y testing le fue difícil despegarse de estos roles y Java + Postman fue a lo que más se dedicó a lo largo de los 4 sprints. Además realizó múltiples tareas de base de datos y se tomó el tiempo de completar esta con datos reales tomados de Booking.com. Por otro lado, aportó a los detalles estéticos y branding del sitio manteniendo una buena relación con aquello relacionado a UX/UI (a pesar de no tratarse de un rol específico).

| Tecnología   | Fortaleza   | 
| :---:      | :---:      |
| Front end   | 🔵 ⚪ ⚪   |
| Back end   | 🔵 🔵 🔵   |
| Infraestructura   | 🔵 ⚪ ⚪   |
| Testing / QA   | 🔵 🔵 ⚪   |
| Bases de datos   | 🔵 🔵 🔵   |

- :mushroom: **Micaela Libonati** :mushroom: :
    - Durante el transcurso de esta carrera, a pesar de que costó entender y adentrarse en el mundo de la programación, Java fue lo que más le interesaba y donde más se enfocaba incrementar sus conocimientos, sin dejar de lado Bases de Datos. Pero, una vez llegado el proyecto integrador, dedicó su tiempo full time durante estos 4 roles a la infraestructura de la app, lo cual le resultó un desafio interesante y a la vez enriquecedor. Además de su cercanía con la infraestructura, realizo pequeñas tareas de testing y de backend durante los dos primeros sprints, siempre dispuesta a acompañar y a ayudar a su equipo.

| Tecnología   | Fortaleza   | 
| :---:      | :---:      |
| Front end   | 🔵 ⚪ ⚪   |
| Back end   | 🔵 🔵 🔵   |
| Infraestructura   | 🔵 🔵 🔵   |
| Testing / QA   | 🔵 ⚪ ⚪   |
| Bases de datos   | 🔵 🔵 ⚪   |

- 👨‍💻 **Rafael Gijón** 👨‍💻
   - Durante los diversos sprints de desarrollo, se encargó principalmente del desarrollo de las diferentes ventanas y lógicas funcionales del Frontend de la aplicación, definiendo la arquitectura del proyecto y la estructura de componenetes, páginas y recursos. Durante los sprints se encomendó a la tarea de entregar las nuevas maquetas provistas en los Figmas de UI-UX, y conectando las nuevas funcionalidades desarrolladas en el Backend.

| Tecnología   | Fortaleza   | 
| :---:      | :---:      |
| Front end   | 🔵 🔵 🔵   |
| Back end   | 🔵 🔵 ⚪ |
| Infraestructura   | 🔵 ⚪ ⚪   |
| Testing / QA   | 🔵 🔵 ⚪   |
| Bases de datos   | 🔵 🔵 ⚪   |

- 🐟 **Enzo Ferreira** 🐟
   - Durante todos los sprints del desarrollo del proyecto, me encargué de realizar en gran medida la API del **`Backend`**, con sus clases y la lógica de negocio necesaria para poder cumplir con los requerimientos de este y, también brindarle todos los datos en la forma que los necesitara el frontend. Pude realizar prácticas en el area de **`Testing/QA`** durante el segundo sprint, realizando pruebas manuales, Test Cases y toda la parte de Automation y tests de integración desde **`Postman`** con el uso de colecciones y la utilización del runner, luego, hice también aportes a lo largo de todo el recorrido como **`DBA`**, actualizando la base de datos ante cada necesidad que surgiera y manteniendola óptima para una rápida ejecución e inserción de los datos desde la consola. Finalmente, en el último sprint, pude realizar además de seguir desarrollando el back, algunas tareas sobre la instancia EC2 que alojaba el backend y el pipeline de CI/CD de la **`Infraestructura`**, para poder deployar correctamente la API en **`AWS`** junto a todos mis compañeros.

| Tecnología   | Fortaleza   | 
| :---:      | :---:      |
| Front end   | 🔵 🔵 ⚪   |
| Back end   | 🔵 🔵 🔵 |
| Infraestructura   | 🔵 🔵 ⚪   |
| Testing / QA   | 🔵 🔵 ⚪   |
| Bases de datos   | 🔵 🔵 🔵   |

## :wrench: **METODOLOGÍA DE TRABAJO** :wrench:

- :arrows_counterclockwise: *Scrum* :arrows_counterclockwise:
    - Durante el desarrollo de toda la práctica del proyecto se trabajó con metodologías ágiles Scrum.
    - En cuanto a la asignación de roles optamos por comenzar dividiéndonos 2 personas por rol y 2 roles por persona. Estos fueron seleccionados según nuestras fortalezas con el objetivo de crear una base sólida de proyecto; de esta manera podíamos manejar mejor los tiempos al estar familizarizados con las herramientas y no tropezarnos tanto logrando un buen primer MVP. Al avanzar el proyecto decidimos rotar manteniendo una persona en el mismo rol y moviendo a la otra, así podíamos insertar a alguien nuevo al área quien tuviera un compañero embebido en el código/la tarea que pudiera ayudarlo a comprender bien de qué se trataba, qué había hecho y cómo era pertinente avanzar. A pesar de tener roles consolidados en todos los sprints se mantuvo un enfoque dinámico y diligente que nos permitía aportar a las diferentes áreas conforme estas lo necesitaran o se cumplieran algunas tareas antes que otras, dando lugar al cambio de tareas individuales según fueran requeridas. 

## :open_file_folder: **BITÁCORA DE PROYECTO** :open_file_folder:

- :cyclone: _Los sprints_ :cyclone:

    - El primer Sprint fue encarado con optimismo y ánimos, veníamos frescos del final de tercer bimestre y nos encontramos con un grupo sumamente funcional y amigable que nos inspiró tanto a dar lo mejor de cada uno como a aspirar a la excelencia de la primera instancia de producto :muscle:. Al tratarse de temas mayormente vistos de manera reciente, este sprint fue el más liviano en cuanto a conocimientos pero cargado en lo que respecta a la cantidad de trabajo para realizar; aún así llegamos cómodos y logramos cumplir hasta con las tareas opcionales incluso con uno de los encargados de front end, Rafa, enfrentándose a una grave lesión y subsecuente operación.
    - Viniendo de un primer Sprint altamente exitoso :sparkles:, afrontamos el segundo con mucha 'garra' ya contando con un equipo más unido que estaba listo para hacer frente a tareas más desafiantes y complejas que requirieron más investigación de nuestra parte. La comunicación fue un punto clave, ya que permitió una organización ordenada y distribución cómoda de tareas al igual que un entendimiento global de lo que afrontaba cada área del proyecto y sus necesidades para con las demás.
    - El tercer Sprint nos encontró con más problemas personales que otra cosa, Enzo se quedó sin computadora, Cam debía afrontar una mudanza y el equipo no podía permitir que esto afectara la calidad de su producto final. Aún así, logramos presentar la mayor parte de los requerimientos (a excepción de aquellos que quedaron atrapados en la difunta computadora de Enzito :dizzy_face:) y logramos mantener, dentro de todo, una buena comunicación y ambiente grupal.
    - Gracias al compromiso de todo el equipo logramos llegar relativamente cómodos al cuarto y último Sprint, esto nos permitió afrontar algunas tareas menores como rediseñar el logo y cambiarle la paleta de colores al sitio además de conseguir un dominio personalizado para nuestro sitio: 🥳 code-inn.ar 🥳. Aún así, no todo fue fácil... El deploy del backend en AWS no vino sin sus complicaciones y dejó a algunos compañeros con pocas horas de sueño - que por suerte lograron recuperar tras la demo :sleeping:.

- :punch: _Nuestras fortalezas_ :punch:

    - No podríamos haber pedido un mejor equipo, cada uno presenta pasión por lo que hace lo cual se traduce en una gran predisposición a la hora de afrontar problemas y aprender cosas nuevas. Contamos con perfiles orientados al backend e infraestructura que no descansan hasta haber completado una tarea de la manera más eficiente posible, frontenders que se encuentran al tanto de todas las librerías y las últimas tendencias en diseño, al igual que testers exhaustivos que buscan la excelencia máxima del producto a presentar. Tomando todo eso y contagiando una actitud positiva de persona a persona logramos que todas las áreas se encontraran embebidas de la esencia de cada uno aunque este no trabajara directamente en el código de cada cosa; todo el trabajo se vió enriquecido de las opiniones, perspectivas y criterios de todos los integrantes del equipo que ayudaron a darle alma al proyecto.

- :confounded: _Nuestras debilidades_ :confounded:

    - Apesar del hermoso equipo que formamos y la predisposición para trabajar y colaborar en conjunto, durante el transcurso del proyecto se presentaron varios obstaculos. Los problemas personales que tuvieron algunos miembros del equipo afectaron en gran parte a la organización del grupo y el tiempo para completar las tareas. Sin embargo, a pesar de trabajar bajo presion y con el tiempo justo, en todos los sprints pudimos llegar con la mayoria de los requerimientos completos, y eso se lo debemos a la colaboración de todo el equipo.
    - Por otra parte, cuando llegamos a un par de sprints con algunos issues pendientes, siendo un equipo tan comprometido y exhaustivo a la hora de completar nuestro respectivo trabajo, nos costó manejar la frustración cuando no se cumplian con todas las tareas, y también aceptar que a veces suceden cosas inesperadas que no dependen del equipo en sí. Con el pasar del tiempo, tomando los respectivos descansos, planificando mejor la organización de las tareas, y comunicando a los miembros del equipo lo que le pasaba a cada uno, aprendimos a manejar las frustraciones y tolerar la inconformidad.

## :computer: **TECNOLOGÍAS UTILIZADAS** :computer:
- A la hora de llevar a cabo el proyecto fue tomado en cuenta todo lo aprendido durante la cursada conforme a servicios, herramientas y metodologías en pos de explorar a fondo aquello explorado y seguir sumando a nuestro abanico de conocimientos. Tomando eso en cuenta, se hizo énfasis en el uso de diversos IDEs, frameworks y librerías según las necesidades de cada lenguaje.
- En cuanto a la gestión del proyecto, el equipo comenzó por crear un servidor personalizado en discord separado por roles y con canales del mismo nombre para compartir recursos al igual que información relevante para quienes ocuparan los diferentes roles a posteriori; asimismo, esta organización sirvió para de centralizar las dudas y pedidos que surgieran en las diversas áreas hacia un rol específico de manera ordenada y que estos queden registrados. Por otra parte, al inicio de cada sprint se tomaron los issues de gitlab y aplicando el método de Planning Poker (a través de la herramienta https://planningpoker.live) buscamos estimar la complejidad tanto técnica como en medida de tiempo de cada una de las tareas intentando encontrar un consenso a través de la conversación para comprender los diferentes puntos de vista. Con respecto al desarrollo del proyecto se utilizó como único sistema de control de versiones Gitlab, y utlizamos Mock API (https://mockapi.io/) para realizar desde el front los mocks requeridos para construir las ventanas, en paralelo al desarrollo del backend.
- Por otro lado, al hablar de las herramientas y tecnologías utilizadas para el desarrollo del sitio, es más fácil contarlo rol por rol:
  - **Front end**:
    - _Visual Studio Code_: Como herramienta para crear, editar y mantener el código del frontend, utilizando al máximo las extensiones como Prettier, Git Lens, Github Autopilot, etc.        
    - _React_: Como librería de desarrollo de aplicaciones del tipo SPA para JavaScript. 
    - _Material UI_: Como kit de herramientas de UI para aligerar y facilitar el desarrollo de las pantallas requeridas, utilizando esqueletos de componentes responsivos previamente desarrollados y mantenidos por Material UI.
  - **Back end**:
    - _Intellij Idea Community_: Como IDE para el desarrollo de la API en Java.
    - _Maven_: Como gestor de dependencias.
    - _Spring_: Como Framework para facilitar el desarrollo y otimizar el tiempo empleado.
    - _Hibernate_: Como ORM para realizar la mayoría de las consultas contra la BD.
    - _JWT_: Para implementar la seguridad a través de un token.
  - **Base de datos**:
    - _MySQL Workbench_: La realidad es que se trata de una herramienta extremadamente completa, por lo que nos permitió realizar tanto los esquemas UML como el código SQL y levantar una base de datos local inicial.
    - _JPA Buddy_: Se trata de un Plugin para Intellij que permite ver tablas y relaciones entre entidades una manera más visual. Este se conectaba a la base de datos gracias a la conexión encontrada en el application.properties y garantizaba que se crearan de manera correcta las conexiones al poner en evidencia cuando estas no correspondían con la base previamente creada.
  - **Infraestructura**:
    - _CloudCraft_: Herramienta utilizada para el desarrollo del diseño de la infraestructura, idealmente para realizar los diagramas y mapeo de la red en 3D y mejor adaptación gráfica. También realiza los costos de cada elemento utilizado, y genera el presupuesto final de la red de nuestra app.
    - _Terraform_: Implementamos Terraform para poder lograr la creación automática de las red la cual levantamos después en AWS. 
    - _Amazon Web Services_: Servicio virtual de la nube. Amazon nos brinda un excelente servicio en donde podemos depositar nuestra infraestructura, permitiendonos crear y optimizar nuestra infraestructura levantada en la red.
    - _Gitlab_: Por ultimo, gitlab nos ofrece la creacion de pipelines los cuales sirven para deployar rapidamente el codigo e implementa los cambios instantaneos a la app.
  - **Testing**:
    - _Google Spreadsheets_
    - _Postman_: Como herramienta de pruebas para probar la API y realizar test automatizados.
    - _Jest_: Para realizar los test unitarios sobre el código desarrollado en el frontend y establecer una buena cobertura en cada sprint.

## :computer: **DOCUMENTACIÓN TÉCNICA** :computer:

- **Base de datos**:
  - Para la creación y la gestión de base de datos utilizamos MySQL Server, su GUI Workbench y de extras algunos plugins como MySQL Shell para conectarnos por consola, todos en su versión **v8.0.29**.
  - En la rama 'database' de este mismo repositorio puede encontrarse un script sql que simplemente al correrlo levanta una base de datos de manera local que además de contener los comandos para crear y seleccionar la misma, contiene un set de 40 hospedajes (llamados dentro de esta 'accommodations') dummy para probar todas las funcionalidades de la aplicación. El archivo está separado en dos partes claramente delimitadas que en caso de que se quiera crear la base por un lado y cargar los datos de ejemplo por otro puede ser separado en dos y estos corridos individualmente.

- **Infraestructura**:
  - Pensado para la automatización y velocidad de la app, durante el transcurso del proyecto fuimos acomodando las instancias y sacando elementos innecesarios al proyecto, ya que iban a generar muchísimos costos y no eran tan útiles como pensabamos al principio, como por ejemplo, balanceadores de carga, autoescalados, y varias instancias EC2 tanto en la parte del FrontEnd como en el BackEnd. Finalmente, el diseño es super básico pero funcional al proyecto, ya que una vez levantado en la nube la aplicación funciona rapidamente a la hora chequear la funcionalidad de la misma.
  - Una vez finalizado el diseño de la infraestructura, comenzamos a levantar la infrastructura utilizando AWS, y Terraform como codigo para poder llegar a los recursos de la nube. 
  - Por ultimo, realizamos dos pipelines, uno de frontend y uno de backend, hechos en gitlab con formato yaml, para que los desarroladores a la hora de actualizar el codigo, con cada commit puedan automatizarse los cambios y actualizarse directamente en la aplicación Code-Inn.
    
- **Testing y calidad**
  - Orientado a garantizar la excelencia de la aplicación. Se busca alcanzar la mayor cobertura posible en el testeo de las funcionalidades del sitio solicitados en los diferentes sprints. Realizados con Postman, Jest y de forma Manual, mediante casos de prueba, tanto de humo como de regresión y testeos exploratorios.
  - Link testing manual: https://docs.google.com/spreadsheets/d/170Lsibh4gOYK-h_Q7jBOKnabzqjmvNmR/edit#gid=78607399
  - Link a la colección de POSTMAN: https://drive.google.com/file/d/17JXbBydoLAAJCUZlY7x4SEYnxv-RRFHq/view?usp=sharing
  - Link reporte final: https://docs.google.com/document/d/1xtqWBkPDNXh2S76Ny9WsqWR_u5bni0ksoCTl62vEMi0/edit#

- **Backend**:
  - Tener IntelliJ IDEA instalado. Para el desarrollo de este proyecto utilizamos la versión **Community 2021.3.3**, con la actualización de la **Build #IC-213.7172.25**.
  - En cuanto a la versión de Java, se desarrolló y compiló utilizando la version **17** asi que tener la versión 17 o superior de **JRE** y **JDK** sería lo correcto.

## 🤖 **API** 🤖

### Url base de la API:
- https://www.api-code-inn.herokuapp.com

### Cuenta **admin** para utilizar:
- Email: admin_admin@mail.com
- Pass: adminadmin

---

### **ENDPOINTS**

#### Categorías :
* (PÚBLICO) Traer todos: ***GET*** - /categories/all
* (PÚBLICO) Traer uno : ***GET*** - /categories/id/:id
* (ADMIN) Crear uno : ***POST*** - /categories/create
* (ADMIN) Editar uno : ***PUT*** - /categories/edit
* (ADMIN) Eliminar uno : ***DELETE*** - /categories/delete/:id

***CREAR UN RECURSO***:
> ***Body***
>~~~
>{
>    "title": String,
>    "imgUrl": String,
>    "description": String
>}
>~~~
> ***Response***
>~~~
>{
>    "id": Integer,
>    "title": String,
>    "imgUrl": String,
>    "description": String,
>    "accommodations": []
>}
>~~~

***EDITAR UN RECURSO***:
> ***Body***
>~~~
>{
>    "id" : Integer,
>    "title": String,
>    "imgUrl": String,
>    "description": String
>}
>~~~
>***Response***
>~~~
>{
>    "id" : Integer,
>    "title": String,
>    "imgUrl": String,
>    "description": String
>    "accommodations": []
>}
>~~~

### Ciudades:
* (PÚBLICO) Traer todos : ***GET*** - /cities/all
* (ADMIN) Crear uno : ***POST*** - /cities/create
* (ADMIN) Editar uno : ***PUT*** - /cities/edit

***CREAR UN RECURSO***:
> ***Body***
>~~~
>{
>    "name": String,
>    "latitude": Float,
>   "longitude": Float,
>    "province": String,
>    "country": String
>}
>~~~
> ***Response***
>~~~
>{
>    "id": Integer,
>    "name": String,
>    "latitude": Float,
>    "longitude": Float,
>    "province": String,
>    "country": String
>    "accommodations": []
>}
>~~~

***EDITAR UN RECURSO***:
> ***Body***
>~~~
>{
>   "id": Integer,
>    "name": String,
>    "latitude": Float,
>    "longitude": Float,
>    "province": String,
>    "country": String
>}
>~~~
> ***Response***
>~~~
>{
>    "id": Integer,
>    "name": String,
>    "latitude": Float,
>    "longitude": Float,
>    "province": String,
>    "country": String
>    "accommodations": []
>}
>~~~

### Alojamientos :
* (PÚBLICO) Traer todos : ***GET*** - /accommodations/all
* (PÚBLICO) Traer uno : ***GET*** - /accommodations/id/:id
* (ADMIN) Crear uno : ***POST*** - /accommodations/create
* (ADMIN) Editar uno : ***PUT*** - /accommodations/edit 
* (ADMIN) Eliminar uno : ***DELETE*** - /accommodations/delete/:id
* (PÚBLICO) Filtrar : ***GET*** - /accommodations/search 
    > **Search Params:** solo una opción es válida como búsqueda
    > - ***category: string***
    > - ***city: String***
    > - ***city: String & startDate:String(ISO 8601) & finishDate:String(ISO 8601)***

***CREAR UN RECURSO***:
> ***Body***
>~~~
>{
>    "title": String,
>    "address": String,
>    "latitude": Float,
>    "longitude": Float,
>    "description": String,
>    "rating": Double,
>    "rating_text": String,
>    "stars": Integer,
>    "cancellation_policy": Integer
>    "category": { 
>        "id": Integer 
>    },
>    "city": { 
>        "id": Integer 
>    },
>    "images": [
>        { 
>            "title": String,
>            "imgUrl": String
>        }
>    ],
>    "rules": [
>        {
>            "description": String
>        }
>    ],
>    "characteristics": [
>        {
>            "title": String,
>            "icon": String 
>        }
>    ]
>    "health_safety": [
>        {
>            "title": String
>        }
>    ]
>}
>~~~
> ***Response***
>~~~
>{
>    "id": Integer,
>    "title": String,
>    "address": String,
>    "latitude": Float,
>    "longitude": Float,
>    "description": String,
>    "rating": Double,
>    "rating_text": String,
>    "stars": Integer,
>    "cancellation_policy": Integer
>    "images": [
>        { 
>            "id": Integer,
>            "title": String,
>            "imgUrl": String
>        }
>    ],
>    "rules": [
>        {
>            "id": Integer,    
>            "description": String
>        }
>    ],
>    "characteristics": [
>        {
>            "id": Integer,
>            "title": String,
>            "icon": String 
>        }
>    ]
>    "health_safety": [
>        {
>            "id": Integer
>            "title": String
>        }
>    ]
>}
>~~~

### Reservas:
* (ADMIN) Traer todos : ***GET*** - /reservations/all
* (ADMIN) Traer uno : ***GET*** - /reservations/id/:id
* (ADMIN) Editar uno : ***PUT*** - /reservations/edit
* (ADMIN) Traer todos por id de alojamiento : ***GET*** - /reservations/accommodation/:id
* (USER) Crear uno : ***POST*** - /reservations/create
* (USER) Traer todos por id de usuario : ***GET*** - /reservations/user/:id

***CREAR UN RECURSO***:
> ***Body***
>~~~
>{
>   "arrivalTime": String,
>   "startDate": String,
>   "finishDate": String,
>   "accommodation": {
>       "id": Integer
>   },
>   "user": {
>       "id": Integer
>   }
>}
>~~~
> ***Response***
>~~~
>{
>   "id": Integer,
>   "arrivalTime": String,
>   "startDate": String,
>   "finishDate": String,
>   "accommodation": {
>       "id": Integer,
>       "title": String,
>       "category": String,
>       "city": String
>   },
>   "userID": Integer
>}
>~~~

### Características:
* (ADMIN) Traer todos : ***GET*** - /characteristics/all 
* (ADMIN) crear uno : ***POST*** - /characteristics/create
* (ADMIN) Editar uno : ***PUT*** - /characteristics/edit
* (ADMIN) Eliminar uno : ***DELETE*** - /characteristics/delete/:id

***CREAR UN RECURSO***:
> ***Body***
>~~~
>{
>   "title": String,
>   "icon": String
>}
>~~~
> ***Response***
>~~~
>{
>   "id": Integer,
>   "title": String,
>   "icon": String
>}
>~~~
***EDITAR UN RECURSO***:
> ***Body***
>~~~
>{
>   "id": Integer,
>   "title": String,
>   "icon": String
>}
>~~~
> ***Response***
>~~~
>{
>   "id": Integer,
>   "title": String,
>   "icon": String
>}
>~~~

---
**Para ver diagramas e imagenes de las graficas requeridas en cada rol, puede ingresar al siguiente [link](https://www.canva.com/design/DAFFpuevGn0/Vyt-QrNvE5PgiJeQfY2ZQg/view?utm_content=DAFFpuevGn0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) de la presentación del proyecto Code-Inn**
