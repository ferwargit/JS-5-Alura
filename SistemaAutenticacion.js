export class SistemaAutenticacion {
  static login(usuario,clave) {
    // if(empleado.clave == clave)
    //   return true;
    // return false;
    // console.log(usuario.clave);
    // console.log(clave);
    return usuario.autenticable(clave);
    // return usuario.clave == clave;
  }
}