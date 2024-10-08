# TA---HTML-Javascript-Bulma-

La consigna es crear un gestor de tareas web, similar al que ofrecen varias plataformas del mercado, como Trello.

Se contarán con 5 columnas, cada una de ellas representando el estado en el que se puede encontrara una tarea: Backlog, To Do, In Progress, Blocked y Done.

De cada tarea, se pide manejar la siguiente información:

Título: texto simple
Descripción: texto simple
Asginado: listado de opciones pre-cargadas
Prioridad: listado de opciones pre-cargadas
Estado: listado de opciones pre-cargadas (para este campo particular, las opciones posibles ya están dadas, una opción por cada columna)
Fecha límite: texto en formato Date, se recomienda usar un input apropiado
La web debe ser responsiva, siguiendo la filosofía mobile-first.
Los bosquejos de diseño los pueden encontrar en el siguiente link.

Presten atención al hecho de que al hacer click en el botón de nueva tarea, se abre un modal donde se puede cargar la información. Tanto si se decide aceptar o cancelar la creación de la tarea, se deben limpiar los inputs, de manera que al hacer click el botón de nuevo, no haya ninguna información cargada.

También, al agregar una nueva tarea, la misma debe aparecer luego en la columna correspondiente al estado que hayan puesto en el campo de la tarea.

Al hacer click en una tarea particular, se deberá abrir un modal con la información pre-cargada de la tarea a la cual se le hizo click. El modal debe permitir editar los campos, y cualquier cambio que se haga debe ser guardado si se hace click en aceptar.

Consideraciones de los bosquejos:
Para 1440px, se pide que haya un scrolling horizontal en la pantalla principal, para poder ver las columnas que quedan por fuera
Para 768px, se pide que se haga un wrap, de manera que no sea necesario hacer scrolling
Para 425px, se pide que haya un scrolling vertical, de manera de poder ver todas las columnas. El botón de agregar tarea en 425px pasa de un posicionamiento estático a un posicionamiento absoluto.
Para todas las resoluciones, una vez haya establecido una altura apropiada para las columnas, se pide que haya un scrolling vertical dentro de cada uno de ellas en caso de que sea necesario (si hay demasiadas tareas a mostrar para esa columna).
Puntos Extras
La web cuenta con la posibilidad de cambiar entre modo Dark y Light
Se puede cambiar el estado de las tareas arrastrandolas entre las columnas (drag and drop)