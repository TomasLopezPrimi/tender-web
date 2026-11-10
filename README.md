# Web Tender

## Cuotas sin interés

Configurar `CUOTAS_SIN_INTERES` en Dokploy con un entero positivo para mostrar el beneficio en la ficha de producto y en la selección de Getnet. Si falta, está vacío o no es válido, el aviso queda apagado. La variable se lee en el servidor y no se expone al navegador.

Al cambiar el valor, hay que volver a desplegar o reiniciar el contenedor para que el proceso de Next.js reciba la nueva variable. No hace falta reconstruir la imagen solo por cambiar este valor; el cambio no es instantáneo mientras siga ejecutándose el proceso anterior.
