export class SistemaAutenticacion {
  static login(usuario, clave) {
    // if(empleado.clave == clave)
    //   return true;
    // return false;
    // console.log(usuario.clave);
    // console.log(clave);
    if ("autenticable" in usuario && usuario.autenticable instanceof Function) 
      return usuario.autenticable(clave);
    else 
      return false;
    // return usuario.clave == clave;
  }
}
