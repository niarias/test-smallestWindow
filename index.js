function smallestWindow(s, t) {
    // Creo dos Maps para contar las ocurrencias de los caracteres
    let dictT = new Map(), dictS = new Map();
    
    // Cuento las ocurrencias de los caracteres en t (el patrón)
    for (let i = 0; i < t.length; i++) {
        let count = dictT.get(t[i]) || 0;
        dictT.set(t[i], count + 1);
    }

    // La variable 'formed' cuenta cuántos caracteres únicos de t (el patrón)
    // han sido encontrados en la ventana actual de s (la cadena)
    let formed = 0;
    // Variables para los índices de inicio y fin de la ventana actual
    let l = 0, r = 0;
    // Variables para almacenar el tamaño mínimo de la ventana y los índices de inicio y fin
    let minLen = Number.POSITIVE_INFINITY;
    let minL = 0, minR = 0;

    // Bucle principal que recorre la cadena s
    while (r < s.length) {
        // Aumentar el contador para el carácter actual en s
        let countS = dictS.get(s[r]) || 0;
        dictS.set(s[r], countS + 1);
        
        // Si el carácter actual está en t (el patrón) y sus conteos en ambas cadenas son iguales,
        // aumentar el contador 'formed'
        if (dictT.has(s[r]) && dictS.get(s[r]) === dictT.get(s[r])) {
            formed++;
        }

        // Mientras la ventana actual contenga todos los caracteres de t (el patrón)...
        while (l <= r && formed === dictT.size) {
            // Si la ventana actual es más pequeña que la mínima registrada,
            // actualizar la longitud mínima y los índices de inicio y fin
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                minL = l;
                minR = r;
            }

            // Mover el índice de inicio de la ventana a la derecha
            // y disminuir el conteo del carácter en dictS
            dictS.set(s[l], dictS.get(s[l]) - 1);
            // Si el carácter está en t (el patrón) y su conteo en dictS es menor que en dictT,
            // disminuir el contador 'formed'
            if (dictT.has(s[l]) && dictS.get(s[l]) < dictT.get(s[l])) {
                formed--;
            }

            // Mover el índice de inicio de la ventana a la derecha
            l++;
        }

        // Mover el índice de fin de la ventana a la derecha
        r++;
    }

    // Si no se encontró ninguna ventana, devolver una cadena vacía
    // En caso contrario, devolver la cadena de la ventana mínima
    return minLen === Number.POSITIVE_INFINITY ? "" : s.slice(minL, minR + 1);
}

// Probar la función con dos pares de cadenas
console.log(smallestWindow("this is a test string", "tist"));
console.log(smallestWindow("geeksforgeeks", "ork"));
