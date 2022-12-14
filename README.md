# Creamos el archivo CuentaAhorro.js

Definimos nuestra clase.

```javascript
class CuentaAhorro {}
```

Si la clase va hacer accedida desde otros módulos debemos exportarla.

```javascript
export class CuentaAhorro {}
```

Vamos al archivo principal index.js y hacemos la importación.

```javascript
import { CuentaAhorro } from "./CuentaAhorro.js";
```

Ya tenemos en nuestro archivo principal index.js la CuentaAhorro importada.

# ¿Que debería tener nuestra clase?

Una definición de **atributos**.

```javascript
export class CuentaAhorro {
  #cliente;
  numero;
  agencia;
  #saldo;
}
```

Los atributos públicos se pueden definir directamente en el constructor. Dejamos aquí, en este caso, solo los privados.
Mantenemos #cliente y #saldo como atributos privados y agencia y numero como públicos.

```javascript
export class CuentaAhorro {
  #cliente;
  #saldo;
}
```

# Constructor

Creamos el constructor que nos permite construir el objeto, y definimos el código de ese constructor.
Recordamos que si el constructor no esta definido, javascript genera un constructor interno vacio por defecto que no se ve en el código.  
Definimos nuestras variables y la atribución de las mismas.

```javascript
export class CuentaAhorro {
  #cliente;
  #saldo;

  constructor(cliente, numero, agencia, saldo) {
    this.numero = numero;
    this.agencia = agencia;
    this.#cliente = cliente;
    this.#saldo = saldo;
  }
}
```

De esta manera tengo definido mis 4 atributos: 2 privados y 2 públicos.

# Métodos

La CuentaAhorro va transferir, retirar y depositar.
Código similar al de CuentaCorriente.js.

```javascript
export class CuentaAhorro {
  #cliente;
  #saldo;

  constructor(cliente, numero, agencia, saldo) {
    this.numero = numero;
    this.agencia = agencia;
    this.#cliente = cliente;
    this.#saldo = saldo;
  }

  depositoEnCuenta(valor) {
    if (valor > 0) this.#saldo += valor;
    return this.#saldo;
  }

  retirarDeCuenta(valor) {
    if (valor <= this.#saldo) this.#saldo -= valor;
    return this.#saldo;
  }

  verSaldo() {
    return this.#saldo;
  }

  transferirParaCuenta(valor, cuentaDestino) {
    this.retirarDeCuenta(valor);
    cuentaDestino.depositoEnCuenta(valor);
    valor = 200;
    valor = valor * 1000;
  }
}
```

Nos vamos a index.js y creamos un objeto, osea una cuenta ahorro.

```javascript
const cuentaAhorroLeonardo = new CuentaAhorro(cliente, "9985", "001", 0);

console.log(cuentaDeLeonardo);
console.log(cuentaAhorroLeonardo);
```

```javascript
CuentaCorriente { numero: '1', agencia: '001' }
CuentaAhorro { numero: '9985', agencia: '001' }
```

Ya tenemos la clase disponible para trabajar.  
Podemos ver que no estamos pudiendo acceder a nuestros atributos privados.

# Analizando código repetido

Tenemos tanto en CuentaCorriente.js y CuentaAhorro.js código que se repite.  
Al tener código duplicado, el trabajo de agregar o mantener el código se duplica.

# ¿Que deberiamos hacer?

Unificar el código en una sola clase llamada Cuenta.js

```jsx
export class Cuenta {
  #cliente;
  #saldo;

  constructor(cliente, numero, agencia, saldo) {
    this.numero = numero;
    this.agencia = agencia;
    this.#cliente = cliente;
    this.#saldo = saldo;
  }

  depositoEnCuenta(valor) {
    if (valor > 0) this.#saldo += valor;
    return this.#saldo;
  }

  retirarDeCuenta(valor) {
    if (valor <= this.#saldo) this.#saldo -= valor;
    return this.#saldo;
  }

  verSaldo() {
    return this.#saldo;
  }

  transferirParaCuenta(valor, cuentaDestino) {
    this.retirarDeCuenta(valor);
    cuentaDestino.depositoEnCuenta(valor);
    valor = 200;
    valor = valor * 1000;
  }
}
```

Ahora tenemos una sola clase. La clase **Cuenta**.
Hicimos una generalización del proceso pero perdimos funcionalidad.

# Retiros

Para los retiros de cuenta se tiene que cobrar una comisión de 5%.

```javascript
retirarDeCuenta(valor) {
  valor = valor * 1.05;
  if (valor <= this.#saldo) this.#saldo -= valor;
  return this.#saldo;
}
```

# Especialización de la clase

Tenemos una clase con un comportamiento genérico pero debemos darle reglas de negocios o especializaciones a esa clase.

# 1ra Opción

Le agregamos al constructor de la clase un atributo público llamado tipo.

```javascript
constructor(tipo, cliente, numero, agencia, saldo) {
  this.tipo = tipo;
  this.numero = numero;
  this.agencia = agencia;
  this.#cliente = cliente;
  this.#saldo = saldo;
}
```

```javascript
retirarDeCuenta(valor) {
  if (this.tipo == "Corriente")
    valor = valor * 1.05;
  if (valor <= this.#saldo)
    this.#saldo -= valor;
  return this.#saldo;
}
```

En este caso solo se aplicaria a cuentas Corrientes.

```javascript
const cuentaDeLeonardo = new Cuenta("Corriente", cliente, "1", "001", 0);
const cuentaDeMaria = new Cuenta("Corriente", cliente2, "2", "002", 0);

const cuentaAhorroLeonardo = new Cuenta("Ahorro", cliente, "9985", "001", 0);
```

```javascript
Cuenta { tipo: 'Corriente', numero: '1', agencia: '001' }
150
76.5
Cuenta { tipo: 'Ahorro', numero: '9985', agencia: '001' }
Cuenta { tipo: 'Ahorro', numero: '9985', agencia: '001' }
200
80
Cuenta { tipo: 'Ahorro', numero: '9985', agencia: '001' }
```

Ahora las cuentas de Ahorro tendran un 2% de comisión.

```javascript
retirarDeCuenta(valor) {
  if (this.tipo == "Corriente")
    valor = valor * 1.05;
  else if (this.tipo == "Ahorro")
    valor = valor * 1.02;
  if (valor <= this.#saldo)
    this.#saldo -= valor;
  return this.#saldo;
}
```

```javascript
Cuenta { tipo: 'Corriente', numero: '1', agencia: '001' }
150
76.5
Cuenta { tipo: 'Ahorro', numero: '9985', agencia: '001' }
Cuenta { tipo: 'Ahorro', numero: '9985', agencia: '001' }
200
77.6
Cuenta { tipo: 'Ahorro', numero: '9985', agencia: '001' }
```

# 2da Opción: Nuevo esquema para la clase

Para mejorar el comportamiento.

# Herencia

Desde un punto PADRE a un punto HIJO se transfieran atributos y comportamientos.  
Una clase puede tomar toda la funcionalidad de otra clase a partir de que se defina como HIJA, se extiende.  
Los get y set los copiamos a la clase Cuenta.

CuentaCorriente.js

```javascript
import { Cuenta } from "./Cuenta.js";

export class CuentaCorriente extends Cuenta {
  static cantidadCuentas = 0;

  constructor(cliente, numero, agencia) {
    CuentaCorriente.cantidadCuentas++;
  }
}
```

CuentaAhorro.js

```javascript
import { Cuenta } from "./Cuenta.js";

export class CuentaAhorro extends Cuenta {}
```

Tenemos una cuenta BASE : Cuenta.js

```javascript
export class Cuenta {
  #cliente;
  #saldo;

  constructor(cliente, numero, agencia, saldo) {
    this.numero = numero;
    this.agencia = agencia;
    this.#cliente = cliente;
    this.#saldo = saldo;
  }

  set cliente(valor) {
    if (valor instanceof Cliente) this.#cliente = valor;
  }

  get cliente() {
    return this.#cliente;
  }

  depositoEnCuenta(valor) {
    if (valor > 0) this.#saldo += valor;
    return this.#saldo;
  }

  retirarDeCuenta(valor) {
    if (valor <= this.#saldo) this.#saldo -= valor;
    return this.#saldo;
  }

  verSaldo() {
    return this.#saldo;
  }

  transferirParaCuenta(valor, cuentaDestino) {
    this.retirarDeCuenta(valor);
    cuentaDestino.depositoEnCuenta(valor);
    valor = 200;
    valor = valor * 1000;
  }
}
```

# super

Tengo que decirle que construya el constructor de su PADRE.  
LLamo al constructor PADRE mediante la palabra reservada **super**.  
CuentaCorriente.js

```javascript
import { Cuenta } from "./Cuenta.js";

export class CuentaCorriente extends Cuenta {
  static cantidadCuentas = 0;

  constructor(cliente, numero, agencia) {
    super(cliente, numero, agencia, 0);
    CuentaCorriente.cantidadCuentas++;
  }
}
```

De esta forma la clase CuentaCorriente hereda las propiedades y métodos de la clase Cuenta.

CuentaAhorro.js

```javascript
import { Cuenta } from "./Cuenta.js";

export class CuentaAhorro extends Cuenta {
  constructor(cliente, numero, agencia, saldo) {
    super(cliente, numero, agencia, saldo);
  }
}
```

Se debe tener una clase BASE y se hace HERENCIA.  
De esta forma tenemos código extensible.

# Accediendo y Sobrescribiendo la clase PADRE : Cuenta.js

```javascript
prueba() {
    console.log('Método PADRE')
}
```

Quiero llamar al metodo prueba de la clase PADRE  
CuentaCorriente.js

```javascript
prueba() {
  super.prueba();
  console.log('Método HIJO');
}
```

En index.js

```javascript
cuentaDeLeonardo.prueba();
```

```javascript
Método PADRE
Método HIJO
```

Si quiero ejecutar solo para el HIJO quito super  
En CuentaCorriente.js

```javascript
prueba() {
    console.log('Método HIJO');
}
```

```javascript
cuentaDeLeonardo.prueba();
```

```javascript
Método HIJO
```

Estoy sobrescribiendo el método prueba. Tiene el mismo nombre del método PADRE. Puedo o no usar la sobrescritura mediante la palabra super. Tambien puedo convinarla, llamar al padre y escribir código en el HIJO.
La herencia es posible definirla en múltiples niveles. Debemos tener cuidado pues podemos llegar a generar un árbol de herencia complejo que al final nos puede generar problemas de mantenimiento.  
CuentAhorro.js

```javascript
import { Cuenta } from "./Cuenta.js";

export class CuentaAhorro extends Cuenta {
  constructor(cliente, numero, agencia, saldo) {
    super(cliente, numero, agencia, saldo);
  }

  retirarDeCuenta(valor) {
    valor = valor * 1.02;

    super.retirarDeCuenta(valor);
  }
}
```

CueentaAhorro.js

```javascript
import { Cuenta } from "./Cuenta.js";

export class CuentaAhorro extends Cuenta {
  constructor(cliente, numero, agencia, saldo) {
    super(cliente, numero, agencia, saldo);
  }

  retirarDeCuenta(valor) {
    valor = valor * 1.02;

    super.retirarDeCuenta(valor);
  }
}
```

# Mejoras del código

Cuenta.js

```javascript
retirarDeCuenta(valor, comision) {
  valor = valor * (1+comision/100);
  if (valor <= this.#saldo)
    this.#saldo -= valor;
  return this.#saldo;
}
```

CuentaCorriente.js

```javascript
retirarDeCuenta(valor) {
  super.retirarDeCuenta(valor,5);
}
```

CuentaAhorro.js

```javascript
retirarDeCuenta(valor) {
  super.retirarDeCuenta(valor,2);
}
```

De esta forma definimos que el metodo es privado.
Esto nos permite tener en cuenta un retiro sin comisión.

```javascript
retirarDeCuenta(valor) {
  _retirarDeCuenta(valor,0);
}

_retirarDeCuenta(valor, comision) {
  valor = valor * (1+comision/100);
  if (valor <= this.#saldo)
    this.#saldo -= valor;
  return this.#saldo;
}
```

CuentaCorriente.js

```javascript
retirarDeCuenta(valor) {
  super._retirarDeCuenta(valor,5);
}
```

CuentaAhorro.js

```javascript
retirarDeCuenta(valor) {
  super._retirarDeCuenta(valor,2);
}
```

# Herencia en programación orientada a objetos

https://ljcl79.medium.com/herencia-en-programaci%C3%B3n-orientada-a-objetos-370cf3f97402

# Clases abstarctas

Son aquellas que solo se deben extender.
No se puede acceder a ella.
La clase Cuenta tiene yoda la funcionalidad básica.
Pero nadie debería acceder a la clase Cuenta directamente.
Esa clase abstracta es aquella que no se puede instanciar.
No se puede hacer new, solo se puede hacer extends.
Vamos a evitar que se creen objetos de la clase Cuenta.
La clase Cuenta encapsula el procedimiento principal de nuestro sistema y que no queremos que sea accedido desde afuera.

```javascript
constructor(cliente, numero, agencia, saldo) {
    if(this.constructor == Cuenta) {
      throw new Error('No se debe instanciar objetos de la clase Cuenta');
    }
    this.numero = numero;
    this.agencia = agencia;
    this.#cliente = cliente;
    this.#saldo = saldo;
  }
```

Al desarrollar un sistema las clases bases (clases abstractas) nos ayudan a delimitar el modelo de negocio a implementar y las clases especializadas nos dan información más detallada. Es importante definir las clases que sean necesarias para que podamos tener el modelo organizado de manera correcta.  
Evitamos que algún programador quiera hacer algún tipo de especialización de la clase base, por eso la clase Cuenta es abstracta. De esa manera protegemos la clase Cuenta de funcionalidad principal. Esa clase abstracta solo se puede heredar y sobre esa clase heredada hacer las operaciones y de esa manera el código quede protegido.

# Creamos una nueva clase CuentaNomina.js

```javascript
import { Cuenta } from "./Cuenta";

export class CuentaNomina extends Cuenta {}
```

Aquí tenemos CuentaNomina con toda la funcionalidad de Cuenta.

# Método abstaracto

Tiene la definición pero no tiene la implementación.  
Esta hecho el esqueleto, esta hecho el marco. No hace nada.

```javascript
retirarDeCuenta(valor) {
  // Método abstracto
    throw new Error('Debe implementar el método retirarDeCuenta en su clase');
}
```

De esta manera el método es abstracto y se proteje.
Hacemos la implementación en mi clase CuentaNomina.
Ahora la comision es 1%

```javascript
import { Cuenta } from "./Cuenta.js";

export class CuentaNomina extends Cuenta {
  constructor(cliente, numero, agencia, saldo) {
    super(cliente, numero, agencia, saldo);
  }

  retirarDeCuenta(valor) {
    super._retirarDeCuenta(valor, 1);
  }
}
```

Los métodos abstractos deben ser sobreescritos por las clases hijas.  
Las clases abstractas son diseñadas de forma tal que sólo sean extensibles o heredables por otras clases.  
Nos ayudan a crear el esqueleto de funcionamiento de clases que comparten el funcionamiento, de forma que el código sea reutilizable lo más posible.

# Las clases abstractas. ¿Qué son y para qué sirven?

https://ljcl79.medium.com/las-clases-abstractas-qué-son-y-para-qué-sirven-8328b92db680

# Ordenamos el código en carpetas

Cuentas  
Empleados  
Vamos a crear una clase base de empleados y vamos a crear 2 especializaciones de empleados (Gerente y Director)

# Clase Empleado

```javascript
export class Empleado {
  #nombre;
  #dni;

  constructor(nombre, dni) {
    this.#nombre = nombre;
    this.#dni = dni;
  }
}
```

# Clase Gerente

```javascript
import { Empleado } from "./Empleado.js";

export class Gerente extends Empleado {
  constructor(nombre, dni) {
    super(nombre, dni);
  }
}
```

# Clase Director

```javascript
import { Empleado } from "./Empleado.js";

export class Director extends Empleado {
  constructor(nombre, dni) {
    super(nombre, dni);
  }
}
```

# Clase Empleado

```javascript
export class Empleado {
  #nombre;
  #dni;
  #salario;

  constructor(nombre, dni, salario) {
    this.#nombre = nombre;
    this.#dni = dni;
    this.#salario = salario;
  }

  verBonificacion() {
    return this.#salario;
  }

  _verBonificacion(bono) {
    return this.#salario + (this.#salario * bono) / 100;
  }
}
```

# Clase Gerente

```javascript
import { Empleado } from "./Empleado.js";

export class Gerente extends Empleado {
  constructor(nombre, dni, salario) {
    super(nombre, dni, salario);
  }

  verBonificacion() {
    const bono = 5;
    return super._verBonificacion(bono);
  }
}
```

# Clase Director

```javascript
import { Empleado } from "./Empleado.js";

export class Director extends Empleado {
  constructor(nombre, dni, salario) {
    super(nombre, dni, salario);
  }

  verBonificacion() {
    const bono = 10;
    return super._verBonificacion(bono);
  }
}
```

# Polimorfismo

Cuando tenemos un método, una función o un atributo con el mismo nombre en diferentes clases, solo que estas clases no estan relacionadas entre si en un esquema de herencia. Son clases que se pueden gestionar de manera individual y nos permite ejecutar ese método de diferentes formas. El concepto de polimorfismo es la gestion de métodos, funciones o atributos de diferentes formas.
Nos piden la autenticación de los empleados, el cliente quiere una gestión de claves.

# Clase SistemaAutenticacion

```javascript
export class SistemaAutenticacion {
  static login(usuario, clave) {
    // if(empleado.clave == clave)
    //   return true;
    // return false;
    console.log(usuario.clave);
    console.log(clave);
    return usuario.clave == clave;
  }
}
```

# Clase Cliente

```javascript
export class Cliente {
  nombreCliente;
  dniCliente;
  rutCliente;
  #clave;

  constructor(nombreCliente, dniCliente, rutCliente) {
    this.nombreCliente = nombreCliente;
    this.dniCliente = dniCliente;
    this.rutCliente = rutCliente;
    this.#clave = "";
  }

  asignarClave(clave) {
    this.#clave = clave;
  }

  get clave() {
    return this.#clave;
  }
}
```
# Clase Empleado
```javascript
export class Empleado {
  #nombre
  #dni
  #salario
  #clave

  constructor(nombre, dni, salario) {
    this.#nombre = nombre;
    this.#dni = dni;
    this.#salario = salario;
    this.#clave = '';
  }

  asignarClave(clave) {
    this.#clave = clave;
  }

  get clave() {
    return this.#clave;
  }

  verBonificacion() {
    return this.#salario;
  }

  _verBonificacion(bono) {
    return this.#salario + this.#salario*bono/100;
  }
}
```
# Interfaces
Es el punto donde existe comunicación.
Tenemos la interface como atributo y la iterface como método.
El sistema de Autenticación esta implementado en el método login.
Tanto Cliente como Empleado tienen esa interface que es el atributo llamado #clave en donde el Sistema de Autenticación accede a el.
```javascript
export class SistemaAutenticacion {
  static login(usuario,clave) {
    return usuario.autenticable(clave);
  }
}
```
La interface cambio de ser un atributo a un método.
A nivel de método es mas seguro el encapsulamiento.
La interfaz me permite tener diferentes implementaciones.
Por defecto Javascript califica como undefined a cualquier propiedad de un objeto a la que intentemos acceder en caso de que ella no exista.
La comunicación se realiza a través de interfaces y no estamos limitados a los tipos de datos.

# Repositorio
https://github.com/alura-es-cursos/1785-js-herencia-polimorfismo/tree/ProyectoInicial

