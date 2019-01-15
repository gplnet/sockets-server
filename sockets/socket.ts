import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket, io:socketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
    
}

export const desconectar = (cliente:Socket, io:socketIO.Server) =>{
    cliente.on('disconnect', () =>{
        console.log('Cliente Desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());

    });

}

export const mensaje = ( cliente:Socket, io:socketIO.Server) =>{
    cliente.on('mensaje', (payload: { de:string, cuerpo:string}) =>{
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);

    });
}
//configurarusuario
export const configurarUsuario = ( cliente:Socket, io:socketIO.Server) =>{
    cliente.on('configurar-usuario', (payload: { nombre:string }, callback:Function ) => {
        usuariosConectados.actualixarNombre(cliente.id, payload.nombre);
       // io.emit('mensaje-nuevo', payload);
       io.emit('usuarios-activos', usuariosConectados.getLista());
       callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre}, configurado`
       });

    });
}

//Obtener Usuarios
export const obtenerUsuarios = ( cliente:Socket, io:socketIO.Server) =>{
    cliente.on('obtener-usuarios', ()  => {
        
       // io.emit('mensaje-nuevo', payload);
       io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
       
    });
}
