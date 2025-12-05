// Laboratorio 17 - JavaScript: Manejo de Excepciones y Asincronía
// Autor: Gael Alexander Huamaní Machaca
// Tiempo: 1.5 horas

// ============================================
// FUNCIONES AUXILIARES PARA LA INTERFAZ
// ============================================

// Función para mostrar mensajes en las consolas
function logToConsole(consoleId, message, className = "") {
    const consoleElement = document.getElementById(consoleId);
    const time = new Date().toLocaleTimeString();
    const logEntry = document.createElement("div");
    logEntry.innerHTML = `<span class="${className}">[${time}] ${message}</span>`;
    consoleElement.appendChild(logEntry);
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

// Función para limpiar las consolas
function clearConsole(consoleId) {
    document.getElementById(consoleId).innerHTML = "";
}

// ============================================
// EJERCICIOS DE MANEJO DE EXCEPCIONES (1-8)
// ============================================

// Ejercicio 3: Provocar error y mostrar mensaje
function ejercicio3() {
    try {
        logToConsole("console3", "=== Ejercicio 3: Provocar error ===", "info-text");
        let x = y + 5; // ReferenceError: y no está definida
    } catch (e) {
        logToConsole("console3", `Mensaje del error: ${e.message}`, "error");
        logToConsole("console3", `Tipo de error: ${e.name}`, "warning");
    }
}

// Ejercicio 4: SyntaxError con JSON.parse
function ejercicio4() {
    try {
        logToConsole("console4", "=== Ejercicio 4: SyntaxError con JSON ===", "info-text");
        JSON.parse("{nombre: Juan}"); // JSON inválido
    } catch (e) {
        logToConsole("console4", `Nombre del error: ${e.name}`, "warning");
        logToConsole("console4", `Mensaje: ${e.message}`, "error");
    }
}

// Ejercicio 5: Bloque finally
function ejercicio5() {
    try {
        logToConsole("console5", "=== Ejercicio 5: Bloque finally ===", "info-text");
        console.log(variableInexistente); // ReferenceError
    } catch (e) {
        logToConsole("console5", "falló", "error");
    } finally {
        logToConsole("console5", "siempre se ejecuta", "success");
    }
}

// Ejercicio 6: Función validaEdad
function validaEdad(edad) {
    if (edad < 0 || typeof edad !== 'number' || isNaN(edad)) {
        throw new Error("Edad inválida");
    }
    return "Edad válida";
}

function ejercicio6() {
    logToConsole("console6", "=== Ejercicio 6: Validar edad ===", "info-text");
    
    // Test 1: Edad válida
    try {
        logToConsole("console6", `Prueba con edad 25: ${validaEdad(25)}`, "success");
    } catch (e) {
        logToConsole("console6", `Error: ${e.message}`, "error");
    }
    
    // Test 2: Edad negativa
    try {
        logToConsole("console6", `Prueba con edad -5: ${validaEdad(-5)}`, "success");
    } catch (e) {
        logToConsole("console6", `Error capturado: ${e.message}`, "error");
    }
    
    // Test 3: No es número
    try {
        logToConsole("console6", `Prueba con "veinte": ${validaEdad("veinte")}`, "success");
    } catch (e) {
        logToConsole("console6", `Error capturado: ${e.message}`, "error");
    }
}

// Ejercicio 7: TypeError y instanceof
function ejercicio7() {
    try {
        logToConsole("console7", "=== Ejercicio 7: TypeError ===", "info-text");
        let x = null;
        logToConsole("console7", `Intentando acceder a x.nombre: ${x.nombre}`, "info-text"); // TypeError
    } catch (e) {
        if (e instanceof TypeError) {
            logToConsole("console7", `Es un TypeError: ${e.message}`, "error");
        } else if (e instanceof ReferenceError) {
            logToConsole("console7", `Es un ReferenceError: ${e.message}`, "error");
        } else {
            logToConsole("console7", `Otro tipo de error: ${e.message}`, "error");
        }
    }
}

// Ejercicio 8: Propagación de errores
function nivel2() {
    try {
        logToConsole("console8", "Nivel 2: Intentando acceder a variable indefinida", "info-text");
        console.log(x); // ReferenceError
    } catch (e) {
        logToConsole("console8", `Nivel 2 atrapó el error: ${e.message}`, "error");
        throw e; // Relanza el error
    }
}

function nivel1() {
    try {
        nivel2();
    } catch (e) {
        logToConsole("console8", `Nivel 1 recibió el error: ${e.message}`, "error");
        throw e;
    }
}

function ejercicio8() {
    logToConsole("console8", "=== Ejercicio 8: Propagación de errores ===", "info-text");
    try {
        nivel1();
    } catch (e) {
        logToConsole("console8", `ERROR FINAL capturado en el nivel superior: ${e.message}`, "error");
    }
}

// ============================================
// EJERCICIOS CON CALLBACKS (9-12)
// ============================================

// Ejercicio 9: Cargar mensaje con callback
function cargarMensaje(callback) {
    logToConsole("console9", "Iniciando carga del mensaje...", "info-text");
    setTimeout(() => {
        callback("Mensaje cargado");
    }, 1000);
}

function ejercicio9() {
    logToConsole("console9", "=== Ejercicio 9: Cargar mensaje ===", "info-text");
    cargarMensaje(mensaje => {
        logToConsole("console9", mensaje, "success");
    });
}

// Ejercicio 10: Cargar usuario aleatorio
function cargarUsuario(callback) {
    const tiempo = Math.floor(Math.random() * (1500 - 800 + 1)) + 800;
    const usuarios = [
        { id: 1, nombre: "Juancito" },
        { id: 2, nombre: "María" },
        { id: 3, nombre: "Carlos" },
        { id: 4, nombre: "Ana" },
        { id: 5, nombre: "Pedro" }
    ];
    const usuario = usuarios[Math.floor(Math.random() * usuarios.length)];
    
    logToConsole("console10", `Esperando ${tiempo}ms para cargar usuario...`, "info-text");
    
    setTimeout(() => {
        callback(usuario);
    }, tiempo);
}

function ejercicio10() {
    logToConsole("console10", "=== Ejercicio 10: Cargar usuario ===", "info-text");
    cargarUsuario(usuario => {
        logToConsole("console10", `Usuario cargado: ${usuario.nombre} (ID: ${usuario.id})`, "success");
    });
}

// Ejercicio 11: División asíncrona
function dividirAsync(a, b, callback) {
    logToConsole("console11", `DividirAsync: ${a} / ${b} (esperando 1.5s)`, "info-text");
    setTimeout(() => {
        if (b === 0) {
            callback(new Error("No se puede dividir entre cero"), null);
        } else {
            callback(null, a / b);
        }
    }, 1500);
}

function ejercicio11(a, b) {
    logToConsole("console11", `=== Ejercicio 11: División ${a} / ${b} ===`, "info-text");
    dividirAsync(a, b, (error, resultado) => {
        if (error) {
            logToConsole("console11", `Error: ${error.message}`, "error");
        } else {
            logToConsole("console11", `Resultado: ${resultado}`, "success");
        }
    });
}

// Ejercicio 12: Procesar lista con delays aleatorios
function procesarLista(numeros, callback) {
    let procesados = 0;
    
    numeros.forEach(num => {
        const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
        setTimeout(() => {
            logToConsole("console12", `Procesando ${num}...`, "info-text");
            procesados++;
            if (procesados === numeros.length) {
                callback("Proceso completado");
            }
        }, delay);
    });
}

function ejercicio12() {
    logToConsole("console12", "=== Ejercicio 12: Procesar lista ===", "info-text");
    procesarLista([1, 2, 3, 4], mensaje => {
        logToConsole("console12", mensaje, "success");
    });
}

// ============================================
// EJERCICIOS CON PROMESAS (13-16)
// ============================================

// Ejercicio 13: Cargar mensaje con promesas
function cargarMensajePromesa() {
    logToConsole("console13", "CargarMensajePromesa: Iniciando...", "info-text");
    return new Promise(resolve => {
        setTimeout(() => resolve("Mensaje cargado (Promesa)"), 1000);
    });
}

function ejercicio13() {
    logToConsole("console13", "=== Ejercicio 13: Cargar mensaje (Promesa) ===", "info-text");
    cargarMensajePromesa()
        .then(resultado => {
            logToConsole("console13", resultado, "success");
        })
        .catch(error => {
            logToConsole("console13", `Error: ${error.message}`, "error");
        });
}

// Ejercicio 14: Cargar usuario con promesas
function cargarUsuarioPromesa() {
    logToConsole("console14", "CargarUsuarioPromesa: Iniciando...", "info-text");
    return new Promise(resolve => {
        const tiempo = Math.floor(Math.random() * (1500 - 800 + 1)) + 800;
        const usuarios = [
            { id: 1, nombre: "Juancito" },
            { id: 2, nombre: "María" },
            { id: 3, nombre: "Carlos" }
        ];
        const usuario = usuarios[Math.floor(Math.random() * usuarios.length)];
        
        logToConsole("console14", `Esperando ${tiempo}ms...`, "info-text");
        
        setTimeout(() => resolve(usuario), tiempo);
    });
}

function ejercicio14() {
    logToConsole("console14", "=== Ejercicio 14: Cargar usuario (Promesa) ===", "info-text");
    cargarUsuarioPromesa()
        .then(usuario => {
            logToConsole("console14", `Usuario cargado: ${usuario.nombre} (ID: ${usuario.id})`, "success");
        })
        .catch(error => {
            logToConsole("console14", `Error: ${error.message}`, "error");
        });
}

// Ejercicio 15: División asíncrona con promesas
function dividirAsyncPromesa(a, b) {
    logToConsole("console15", `DividirAsyncPromesa: ${a} / ${b}`, "info-text");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (b === 0) {
                reject(new Error("No se puede dividir entre cero"));
            } else {
                resolve(a / b);
            }
        }, 1500);
    });
}

function ejercicio15(a, b) {
    logToConsole("console15", `=== Ejercicio 15: División ${a} / ${b} (Promesa) ===`, "info-text");
    dividirAsyncPromesa(a, b)
        .then(resultado => {
            logToConsole("console15", `Resultado: ${resultado}`, "success");
        })
        .catch(error => {
            logToConsole("console15", `Error: ${error.message}`, "error");
        });
}

// Ejercicio 16: Procesar lista con promesas
function procesarListaPromesa(numeros) {
    logToConsole("console16", "ProcesarListaPromesa: Iniciando...", "info-text");
    return new Promise(resolve => {
        let procesados = 0;
        numeros.forEach(num => {
            const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
            setTimeout(() => {
                logToConsole("console16", `Procesando ${num}...`, "info-text");
                procesados++;
                if (procesados === numeros.length) {
                    resolve("Proceso completado (Promesa)");
                }
            }, delay);
        });
    });
}

function ejercicio16() {
    logToConsole("console16", "=== Ejercicio 16: Procesar lista (Promesa) ===", "info-text");
    procesarListaPromesa([1, 2, 3, 4, 5])
        .then(mensaje => {
            logToConsole("console16", mensaje, "success");
        })
        .catch(error => {
            logToConsole("console16", `Error: ${error.message}`, "error");
        });
}

// ============================================
// EJERCICIOS CON ASYNC/AWAIT (17-20)
// ============================================

// Ejercicio 17: Cargar mensaje con async/await
async function ejercicio17() {
    logToConsole("console17", "=== Ejercicio 17: Cargar mensaje (Async/Await) ===", "info-text");
    
    try {
        logToConsole("console17", "Iniciando carga...", "info-text");
        const resultado = await new Promise(resolve => {
            setTimeout(() => resolve("Mensaje cargado (Async/Await)"), 1000);
        });
        logToConsole("console17", resultado, "success");
    } catch (error) {
        logToConsole("console17", `Error: ${error.message}`, "error");
    }
}

// Ejercicio 18: Cargar usuario con async/await
async function ejercicio18() {
    logToConsole("console18", "=== Ejercicio 18: Cargar usuario (Async/Await) ===", "info-text");
    
    try {
        const usuario = await new Promise(resolve => {
            const tiempo = Math.floor(Math.random() * (1500 - 800 + 1)) + 800;
            const usuarios = [
                { id: 1, nombre: "Juancito" },
                { id: 2, nombre: "María" }
            ];
            const usuario = usuarios[Math.floor(Math.random() * usuarios.length)];
            
            logToConsole("console18", `Esperando ${tiempo}ms...`, "info-text");
            
            setTimeout(() => resolve(usuario), tiempo);
        });
        
        logToConsole("console18", `Usuario cargado: ${usuario.nombre} (ID: ${usuario.id})`, "success");
    } catch (error) {
        logToConsole("console18", `Error: ${error.message}`, "error");
    }
}

// Ejercicio 19: División asíncrona con async/await
async function ejercicio19(a, b) {
    logToConsole("console19", `=== Ejercicio 19: División ${a} / ${b} (Async/Await) ===`, "info-text");
    
    try {
        const resultado = await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (b === 0) {
                    reject(new Error("No se puede dividir entre cero"));
                } else {
                    resolve(a / b);
                }
            }, 1500);
        });
        
        logToConsole("console19", `Resultado: ${resultado}`, "success");
    } catch (error) {
        logToConsole("console19", `Error: ${error.message}`, "error");
    }
}

// Ejercicio 20: Procesar lista con async/await
async function ejercicio20() {
    logToConsole("console20", "=== Ejercicio 20: Procesar lista (Async/Await) ===", "info-text");
    
    try {
        const numeros = [1, 2, 3, 4];
        const promesas = numeros.map(num => 
            new Promise(resolve => {
                const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
                setTimeout(() => {
                    logToConsole("console20", `Procesando ${num}...`, "info-text");
                    resolve();
                }, delay);
            })
        );
        
        await Promise.all(promesas);
        logToConsole("console20", "Proceso completado (Async/Await)", "success");
    } catch (error) {
        logToConsole("console20", `Error: ${error.message}`, "error");
    }
}

// ============================================
// EJERCICIO 21: SIMULACIÓN GITHUB
// ============================================

function simularEjercicio21() {
    logToConsole("console21", "=== Ejercicio 21: GitHub y Documentación ===", "info-text");
    logToConsole("console21", "1. Creando repositorio en GitHub: 'laboratorio17-js'", "success");
    logToConsole("console21", "2. Subiendo archivos al repositorio...", "info-text");
    logToConsole("console21", "   - index.html", "info-text");
    logToConsole("console21", "   - script.js", "info-text");
    logToConsole("console21", "3. Tomando capturas de pantalla...", "info-text");
    logToConsole("console21", "   ✓ Código HTML", "success");
    logToConsole("console21", "   ✓ Código JavaScript", "success");
    logToConsole("console21", "   ✓ Ejecución en consola", "success");
    logToConsole("console21", "4. Creando PDF con capturas y URL del repositorio", "info-text");
    logToConsole("console21", "5. Subiendo PDF al aula virtual", "info-text");
    logToConsole("console21", "✅ Ejercicio 21 completado simulado", "success");
    logToConsole("console21", "URL simulada: https://github.com/tu-usuario/laboratorio17-js", "warning");
}

// ============================================
// INICIALIZACIÓN
// ============================================

// Mostrar mensaje de bienvenida cuando se carga la página
window.onload = function() {
    logToConsole("console3", "✅ Laboratorio 17 - JavaScript cargado correctamente", "success");
    logToConsole("console3", "Haz clic en los botones para ejecutar los ejercicios", "info-text");
    
    // Inicializar todas las consolas con un mensaje
    for (let i = 3; i <= 21; i++) {
        if (i !== 3) { // Ya pusimos mensaje en consola3
            const consoleId = `console${i}`;
            if (document.getElementById(consoleId)) {
                logToConsole(consoleId, "Consola lista. Haz clic en los botones para ejecutar ejercicios.", "info-text");
            }
        }
    }
};