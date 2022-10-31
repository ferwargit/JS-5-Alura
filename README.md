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
const cuentaDeLeonardo = new Cuenta('Corriente', cliente, '1', '001', 0);
const cuentaDeMaria = new Cuenta('Corriente', cliente2,'2','002', 0);

const cuentaAhorroLeonardo = new Cuenta('Ahorro', cliente,'9985','001',0);
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
# 2da Opción
