import Server from "./clases/server";
import { SERVER_PORT } from "./global/enviroment";
import router  from "./routes/router";

import bodyPArser from 'body-parser';

import cors from 'cors';


const server = new Server();

//Body-Parser
server.app.use(bodyPArser.urlencoded({ extended: true}));
server.app.use(bodyPArser.json());


//Cors
server.app.use(cors({origin: true, credentials: true}));

//Rutas de Servicios
server.app.use('/', router)

server.start( ()=>{
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});
