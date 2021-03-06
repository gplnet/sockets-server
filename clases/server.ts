import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';

import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {
    public app: express.Application;
    public port:number;
    private static _instance: Server;
    public io: socketIO.Server;

    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);

        this.io = socketIO(this.httpServer);
        this.listenSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }
    private listenSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente =>{
            //console.log('Nuevo cliente conectado');
            //console.log(cliente.id);

            //Conectar Cliente
            socket.conectarCliente(cliente, this.io);

            //Configurar usuario
            socket.configurarUsuario(cliente, this.io);

            //Obtener usuarios activos
            socket.obtenerUsuarios(cliente, this.io);

            //Mensajes
            socket.mensaje(cliente, this.io);

            //Desconectar
            socket.desconectar(cliente, this.io);
            
        });
    }

    start( callback: Function){
        this.httpServer.listen(this.port , callback);
    }

}