import { Usuario } from "./usuario";

export class UsuarioLista {

    private lista: Usuario[] = [];

    constructor (){}

    //Agregar un nuevo usuario
    public agregar( usuario: Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    public actualixarNombre(id: string, nombre: string) {
        for( let usuario of this.lista ){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('Actualizando Usuario');
        console.log(this.lista);
    }
    //Obtener toda la lista de usuario conectados
    public getLista(){
        return this.lista;
    }

    public getUsuario(id: string ){
        return this.lista.find( usuario => {
            return usuario.id === id
        });
    }

    //Obtener usuario por una sala en particular
    public getUsuariosPorSala( sala: string ){
        return this.lista.filter( usuario => {
            return usuario.sala === sala
        });
    }
    //Borrar usuario 
    public borrarUsuario(id: string ){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter( usuario => {
            return usuario.id !== id;
        });
        
        return tempUsuario;
    }
}