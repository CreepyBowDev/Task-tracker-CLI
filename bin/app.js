#!/usr/bin/env node

import fs from "node:fs";

const fileName = "tasks.json";

if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, JSON.stringify([], null, 2), "utf8");
}

const argvs = process.argv.slice(2);
const comando = argvs[0];

switch (comando) {
    case "add": {
        const description = argvs.slice(1).join(" ");

        if (!description) {
            console.log("Debes ingresar una descripción.");
            break;
        }

        addTask(description);
        break;
    }

    case "update": {
        const id = parseInt(argvs[1]);
        const newDescription = argvs.slice(2).join(" ");

        if (Number.isNaN(id)) {
            console.log("Debes ingresar un ID válido.");
            break;
        }

        if (!newDescription) {
            console.log("Debes ingresar una nueva descripción.");
            break;
        }

        updateTask(id, newDescription);
        break;
    }

    case "delete": {
        const id = parseInt(argvs[1]);

        if (Number.isNaN(id)) {
            console.log("Debes ingresar un ID válido.");
            break;
        }

        deleteTask(id);
        break;
    }

    case "mark-in-progress": {
        const id = parseInt(argvs[1]);

        if (Number.isNaN(id)) {
            console.log("Debes ingresar un ID válido.");
            break;
        }

        markTask(id, "in-progress");
        break;
    }

    case "mark-done": {
        const id = parseInt(argvs[1]);

        if (Number.isNaN(id)) {
            console.log("Debes ingresar un ID válido.");
            break;
        }

        markTask(id, "done");
        break;
    }

    case "list": {
        const status = argvs[1];

        listTasks(status);
        break;
    }

    default:
        showHelp();
}

function readTasks() {
    try {
        const data = fs.readFileSync(fileName, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.log("Error al leer tasks.json");
        return [];
    }
}

function saveTasks(tasks) {
    fs.writeFileSync(
        fileName,
        JSON.stringify(tasks, null, 2),
        "utf8"
    );
}

function addTask(description) {
    const tasks = readTasks();

    let newId = 1;

    if (tasks.length > 0) {
        const ids = tasks.map(task => task.id);
        newId = Math.max(...ids) + 1;
    }

    const task = {
        id: newId,
        description: description,
        status: "todo",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    tasks.push(task);

    saveTasks(tasks);

    console.log(`Tarea agregada correctamente (ID: ${task.id})`);
}

function updateTask(id, newDescription) {
    const tasks = readTasks();

    const index = tasks.findIndex(
        task => task.id === id
    );

    if (index === -1) {
        console.log("Tarea no encontrada.");
        return;
    }

    tasks[index].description = newDescription;
    tasks[index].updatedAt = new Date();

    saveTasks(tasks);

    console.log("Tarea actualizada correctamente.");
}

function deleteTask(id) {
    const tasks = readTasks();

    const index = tasks.findIndex(
        task => task.id === id
    );

    if (index === -1) {
        console.log("Tarea no encontrada.");
        return;
    }

    tasks.splice(index, 1);

    saveTasks(tasks);

    console.log("Tarea eliminada correctamente.");
}

function markTask(id, newStatus) {
    const tasks = readTasks();

    const index = tasks.findIndex(
        task => task.id === id
    );

    if (index === -1) {
        console.log("Tarea no encontrada.");
        return;
    }

    tasks[index].status = newStatus;
    tasks[index].updatedAt = new Date();

    saveTasks(tasks);

    console.log(`Estado actualizado a "${newStatus}".`);
}

function listTasks(status) {
    const tasks = readTasks();

    if (tasks.length === 0) {
        console.log("No hay tareas para mostrar.");
        return;
    }

    let filteredTasks = tasks;

    if (status) {
        const validStatuses = [
            "todo",
            "in-progress",
            "done"
        ];

        if (!validStatuses.includes(status)) {
            console.log(
                "Estado inválido. Usa: todo, in-progress o done."
            );
            return;
        }

        filteredTasks = tasks.filter(
            task => task.status === status
        );
    }

    if (filteredTasks.length === 0) {
        console.log("No hay tareas con ese estado.");
        return;
    }

    filteredTasks.forEach(task => {
        console.log(`ID: ${task.id}`);
        console.log(`Descripción: ${task.description}`);
        console.log(`Estado: ${task.status}`);
        console.log(`Creada: ${task.createdAt}`);
        console.log(`Actualizada: ${task.updatedAt}`);
        console.log("----------------------------");
    });
}

function showHelp() {
    console.log(`
Task Tracker CLI

Comandos disponibles:

pnpm task-cli add "Descripción"
pnpm task-cli update <id> "Nueva descripción"
pnpm task-cli delete <id>
pnpm task-cli mark-in-progress <id>
pnpm task-cli mark-done <id>
pnpm task-cli list
pnpm task-cli list todo
pnpm task-cli list in-progress
pnpm task-cli list done
`);
}