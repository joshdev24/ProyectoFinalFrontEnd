Descripcion del proyecto: Mi proyecto es una pagina WEB e-commerce, donde hay diferentes rutas y paginas para navegar, cuenta con formularios con verificaciones en cada uno como puede ser Registro, Logeo, Verificacion del token, y Reseteo de contraseña, al ingresar a la pagina te encontras con el home, el cual cuenta con 3 botones, uno para CREAR un producto, uno para Cerrar Sesion y otro como filtrar los productos publicos por el usuario o todos los productos, cada carta de productos cuenta con su Nombre, precio, stock y descripcion e imagen, ademas podes tocar un boton para ver los detalles del producto.

En los productos publicados por el usuario se ven dos botones mas, que son para actualizar o borrar un producto.
Ademas cuenta con 3 CustomHooks, para hacer un fetch a los productos, sus detalles y un hook para los formularios.
Tiene rutas protegidas como lo es, el home y el CRUD de productos




Librerias que utilize: 
FRONTEND: Utilize React para la creacion de componentes, react-router-dom para los usos de useNavigate, useEffect, etc.
BACKEND: Utilize bcrypt para encriptar contraseñas, cors para los permisos de la aplicacion, dotenv para las variables de entorno, jsonwebtoken para la creacion de token de acceso y verificacion, mongose para la base de datos de los usuarios.
mysql12 para la base de datos de los productos y nodemailer para el envio de mails.



La dificultad mas grande que enfrente fue con los links de verficacion del usuario y reseteo de contraseña que se enviaban por mail, por alguna razon no me las reconocia teniendo todad las rutas y links bien, al final lo pude solucionar, haciendo que por mail solo me llegue y token y en la pagina el usuario entre a rutas designadas con un formulario para verificar el token obtenido del mail y al verificar el token, se verificaba al usuario y/o se cambiaba la contraseña

