# Creamos el archivo CuentaAhorro.js
Definimos nuestra clase.
```javascript
class CuentaAhorro {

};
```
Si la clase va hacer accedida desde otros módulos debemos exportarla.
```javascript
export class CuentaAhorro {

};
```
Vamos al archivo principal index.js y hacemos la importación.
```javascript
import { CuentaAhorro } from './CuentaAhorro.js';
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
};
```
Los atributos públicos se pueden definir directamente en el constructor. Dejamos aquí, en este caso, solo los privados.
Mantenemos #cliente y #saldo como atributos privados y agencia y numero como públicos.
```javascript
export class CuentaAhorro {
    #cliente;
    #saldo;
};
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
};
```
De esta manera tengo definido mis 4 atributos: 2 privados y 2 públicos.
# Métodos
La CuentaAhorro va transferir, retirar y depositar.
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
        if (valor > 0)
            this.#saldo += valor;
        return this.#saldo;
    }

    retirarDeCuenta(valor) {
        if (valor <= this.#saldo)
            this.#saldo -= valor;
        return this.#saldo;
    }

    verSaldo() {
        return this.#saldo;
    }

    transferirParaCuenta(valor,cuentaDestino) {
        this.retirarDeCuenta(valor);
        cuentaDestino.depositoEnCuenta(valor);
        valor = 200;
        valor = valor*1000;
    }
};
```
Nos vamos a index.js y creamos un objeto, osea una cuenta ahorro.
```javascript
const cuentaAhorroLeonardo = new CuentaAhorro(cliente,'9985','001',0);

console.log(cuentaDeLeonardo);
console.log(cuentaAhorroLeonardo);
```
```javascript
CuentaCorriente { numero: '1', agencia: '001' }
CuentaAhorro { numero: '9985', agencia: '001' }
```
Ya tenemos la clase disponible para trabajar.  
Podemos ver que no estamos pudiendo acceder a nuestros atributos privados.