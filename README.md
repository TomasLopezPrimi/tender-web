# Web Tender

## Contactos

Configurar ambas variables en `.env` (desarrollo) y como argumentos de build en Dokploy/Docker:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5491131876811
NEXT_PUBLIC_CALLS_NUMBER=541147424688
```

Los valores son obligatorios: formato internacional, solo dígitos, sin `+`, espacios ni guiones. Para Argentina: celular `549` + código de área + número (sin `0` ni `15`); fijo `54` + código de área + número (sin `0`). El fijo de llamadas usa código de área 11.

WhatsApp abre `wa.me`; solo el contacto «Solo llamadas» usa `tel:`. El panel de WhatsApp se abre a los 10 segundos de entrar a la web, una sola vez mientras el layout siga montado. Si el usuario lo abre o cierra manualmente antes, se cancela la apertura automática.

Las variables `NEXT_PUBLIC_*` quedan incorporadas al JavaScript: al cambiarlas hay que reconstruir y desplegar la imagen; no alcanza con reiniciar el contenedor o configurarlas únicamente como variables de runtime.

Verificación de contactos y temporizadores: `node scripts/check-contacts.mjs`.

## Cuotas sin interés

Configurar `CUOTAS_SIN_INTERES` en Dokploy con un entero positivo para mostrar el beneficio en la ficha de producto y en la selección de Getnet. Si falta, está vacío o no es válido, el aviso queda apagado. La variable se lee en el servidor y no se expone al navegador.

Al cambiar el valor, hay que volver a desplegar o reiniciar el contenedor para que el proceso de Next.js reciba la nueva variable. No hace falta reconstruir la imagen solo por cambiar este valor; el cambio no es instantáneo mientras siga ejecutándose el proceso anterior.
