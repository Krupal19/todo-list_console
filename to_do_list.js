var readlineSync = require("readline-sync");
const chalk = require("chalk");

const log = console.log;
const error = chalk.red;
const success = chalk.green;
const incomplete = chalk.bgYellow;


const todoList = [];

function mainMenu() {
    log("\na.) Add an item.");
    log("b.) View all items.");
    log("c.) Update task stats.");
    log("d.) Delete an item.");
    log("e.) Quit :(");
    const selectedOption = readlineSync.question(
        "Select an action to perform from the given options [a, b, c, d, e] : "
    );

    switch (selectedOption) {
        case "a":
            addItem();
            mainMenu();
            break;
        case "b":
            viewItems();
            confirmReturnToMainMenu();
            break;
        case "c":
            updateTaskstatus();
            confirmReturnToMainMenu();
            break;
        case "d":
            deleteItem();
            confirmReturnToMainMenu();
            break;
        case "e":
            return;
        default:
            log(error("Please select an appropriate option."));
            mainMenu();
    }
}

function confirmReturnToMainMenu() {
    const returnToMainMenu = readlineSync.question("\nReturn to main menu? [y, n] : ");
    if (returnToMainMenu === "y") {
        mainMenu();
    } else if (returnToMainMenu === "n") {
        return;
    } else {
        log(error("Please select a valid option :)"));
        confirmReturnToMainMenu();
    }
}

function addItem() {
    const item = readlineSync.question("Add an Item: ");
    todoList.push({ item: item, completed: false });
    log(success("Item added successfully."));
}

function viewItems() {
    let numberOfItems = 0;
    todoList.forEach((todo) => {
        numberOfItems++;
        let taskStatus = '';
        todo.completed ? (success(taskStatus = "complete")) : (error(taskStatus = "incomplete"));
        log(`${numberOfItems}. ${todo.item} Status: ${taskStatus}`);
    });
}

function validItemNumber(number) {
    if (isNaN(number) || number > todoList.length) {
        log(error("Enter a valid ID.\n"));
        return false;
    }
    return true;
}

function deleteItem() {
    viewItems();
    const itemToDelete = readlineSync.question("Enter the ID of the item you want to delete: ");

    if (validItemNumber(itemToDelete)) {
        const indexOfItemToDelete = itemToDelete - 1;
        todoList.splice(indexOfItemToDelete, 1);
        log(success("Item deleted successfully."));
    } else {
        deleteItem();
    }
}

function updateTaskstatus() {
    viewItems();
    const itemToUpdate = readlineSync.question("Enter the ID of the item you want to update: ");

    if (validItemNumber(itemToUpdate)) {
        const indexOfItemToUpdate = itemToUpdate - 1;
        // const itemTextToUpdate = readlineSync.question("Enter text to update: ");
        // todoList[indexOfItemToUpdate].item = itemTextToUpdate;
        const todo = todoList[indexOfItemToUpdate];
        todo.completed ? (todo.completed = false) : (todo.completed = true);
        log(success("Item status updated successfully."));
    } else {
        updateTaskstatus();
    }
}

mainMenu();