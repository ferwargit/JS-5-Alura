/*Importación de clases*/
import { Cliente } from "./Cliente.js";
// import { CuentaCorriente } from "./Cuentas/CuentaCorriente.js";
// import { CuentaAhorro } from "./Cuentas/CuentaAhorro.js";
// import { Cuenta } from "./Cuentas/Cuenta.js";
// import { CuentaNomina } from "./Cuentas/CuentaNomina.js";
import { Empleado } from "./Empleados/Empleado.js";
import { Gerente } from "./Empleados/Gerente.js";
import { Director } from "./Empleados/Director.js";

import { SistemaAutenticacion } from "./SistemaAutenticacion.js";

// const cliente = new Cliente("Leonardo", "13804050", "123224");
// cliente.asignarClave('01111');
// console.log(SistemaAutenticacion.login(cliente,'1111'));
// const cliente2 = new Cliente("María", "16979808", "8989");

const empleado = new Empleado('Juan Perez', '1234343', 10000);
empleado.asignarClave('12345');
console.log(SistemaAutenticacion.login(empleado,'123456'));

const gerente = new Gerente('Pedro Rivas', '232344', 12000);
gerente.asignarClave('6556');
console.log(SistemaAutenticacion.login(gerente,'6556'));

// const director = new Director('Elena Moreno', '232323', 15000);

const cliente = new Cliente('Leonardo','13804050','123224');
cliente.asignarClave('01111');
console.log(SistemaAutenticacion.login(cliente,'01111'));

// console.log(empleado.verBonificacion());
// console.log(gerente.verBonificacion());
// console.log(director.verBonificacion());

// empleado.asignarClave('12345');

// console.log(SistemaAutenticacion.login(empleado,'12345'));

// const cuentaDeLeonardo = new CuentaCorriente(cliente, "1", "001");
// const cuentaDeMaria = new CuentaCorriente(cliente2, "2", "002");

// const cuentaAhorroLeonardo = new CuentaAhorro(cliente, "9985", "001", 0);

// console.log(cuentaAhorroLeonardo);

// const cuentaSimple = new Cuenta(cliente,'098','001',100);

// console.log(cuentaSimple);

// const CuentaNominaLeonardo = new CuentaNomina(cliente,'9985','001',0);
// CuentaNominaLeonardo.depositoEnCuenta(150);
// console.log(CuentaNominaLeonardo.verSaldo());
// CuentaNominaLeonardo.retirarDeCuenta(50);
// console.log(CuentaNominaLeonardo.verSaldo());
// console.log(CuentaNominaLeonardo);
// console.log(cuentaDeLeonardo);
// cuentaDeLeonardo.depositoEnCuenta(150);
// console.log(cuentaDeLeonardo.verSaldo());
// cuentaDeLeonardo.retirarDeCuenta(70);
// console.log(cuentaDeLeonardo.verSaldo());
// console.log(cuentaAhorroLeonardo);

// console.log(cuentaAhorroLeonardo);
// cuentaAhorroLeonardo.depositoEnCuenta(200);
// console.log(cuentaAhorroLeonardo.verSaldo());
// cuentaAhorroLeonardo.retirarDeCuenta(120);
// console.log(cuentaAhorroLeonardo.verSaldo());
// console.log(cuentaAhorroLeonardo);
