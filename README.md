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

