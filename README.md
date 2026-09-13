# Task Tracker CLI

Task Tracker CLI es una aplicación de línea de comandos desarrollada con Node.js para gestionar tareas y almacenarlas en un archivo JSON.

## Funcionalidades

* Agregar tareas
* Actualizar tareas
* Eliminar tareas
* Marcar tareas como `in-progress`
* Marcar tareas como `done`
* Listar todas las tareas
* Filtrar tareas por estado: `todo`, `in-progress` y `done`

## Tecnologías

* Node.js
* JavaScript
* pnpm
* Módulo nativo `fs`
* Git

No utiliza librerías externas.

## Clonar el proyecto

Clona el repositorio con:

```bash
git clone https://github.com/CreepyBowDev/Task-tracker-CLI.git
```

Instala las dependencias:

```bash
pnpm install
```

## Ejecución

Agregar una tarea:

```bash
pnpm task-cli add "Estudiar Node"
```

Actualizar una tarea:

```bash
pnpm task-cli update 1 "Estudiar Node y Git"
```

Eliminar una tarea:

```bash
pnpm task-cli delete 1
```

Marcar una tarea como en progreso:

```bash
pnpm task-cli mark-in-progress 1
```

Marcar una tarea como completada:

```bash
pnpm task-cli mark-done 1
```

Listar todas las tareas:

```bash
pnpm task-cli list
```

Filtrar por estado:

```bash
pnpm task-cli list todo
pnpm task-cli list in-progress
pnpm task-cli list done
```

## Estructura de una tarea

```json
{
  "id": 1,
  "description": "Estudiar Node",
  "status": "todo",
  "createdAt": "fecha de creación",
  "updatedAt": "fecha de actualización"
}
```

Las tareas se almacenan en `tasks.json`, que se crea automáticamente si no existe.
