document.addEventListener("DOMContentLoaded", function () {
    function initializeTaskList() {
        const inputTask = document.getElementById("task");
        const addTask = document.getElementById("addTask");
        const clearTask = document.getElementById("clearTask");
        const textArea = document.getElementById("textArea");
        const dueDate = document.getElementById("dueDate");

        addTask.onclick = function () {
            var newTask;
            if (dueDate.value === "") {
                newTask = new Task(inputTask.value);
            } else {
                newTask = new Task(inputTask.value, dueDate.value);
            }

            if (newTask.isValid()) {
                tasklist.load().add(newTask).save().display(textArea);
                textArea.value = ""; // Clear the input area after adding a task
            } else {
                alert("Enter a task with a future due date");
            }
            textArea.focus();
        };

        clearTask.onclick = function () {
            tasklist.clear().display(textArea);
            inputTask.value = "";
            textArea.value = "";
            dueDate.value = "";
        };

        dueDate.addEventListener("change", function () {
            // Do something if needed when the due date changes
        });

        tasklist.load().display(textArea);
        textArea.focus();
    }

    initializeTaskList();
});




// constructor for individual tasks 
var Task = function (task, dueDate) {
    this.task = task;
    // check if date is valid 
    if (arguments.length === 1) { // check if only one argument (task) is provided
        this.dueDate = new Date();
        this.dueDate.setDate(this.dueDate.getDate() + 1);
    } else {
        this.dueDate = new Date(dueDate);
    }
};

// check to see if input is valid
Task.prototype.isValid = function () {
    if (this.task.trim() === "") {
        return false;
    }
    var currentDate = new Date();
    if (this.dueDate <= currentDate) {
        return false;
    }
    return true;
};

Task.prototype.toString = function () {
    return this.task + "<br> Due Date: " + this.dueDate.toDateString();
};

var getLocalStorage = function (key) {
    var prototype = {
        get: function () { return localStorage.getItem(this.key) || ""; },
        set: function (str) { localStorage.setItem(this.key, str); },
        clear: function () { localStorage.removeItem(this.key); }
    };
    var storage = Object.create(prototype);
    storage.key = key;
    return storage;
};

// Define getTaskStorage before using it
var getTaskStorage = function (key) {
    var prototype = getLocalStorage(key);
    prototype.retrieveTask = function () {
        var str = this.get();
        if (str.length === 0) {
            return [];
        } else {
            return str.split("|").map(function (current) {
                var t = current.split("~~");
                // Correct the creation of the Task object with a new Date instance
                return new Task(t[0], new Date(t[1]));
            });
        }
    };
    prototype.storageTask = function (tasks) {
        if (!Array.isArray(tasks)) {
            this.set("");
        } else {
            var interim = tasks.map(function (current) {
                // Use toISOString to convert the date to a string format that can be parsed later
                return current.task + "~~" + current.dueDate.toISOString();
            });
            this.set(interim.join("|"));
        }
    };
    var storage = Object.create(prototype);
    storage.key = key;
    return storage;
};


var tasklist = {
    task: [],
    storage: getTaskStorage("tasks"),
    load: function () {
        this.task = this.storage.retrieveTask();
        return this;
    },
    save: function () {
        this.storage.storageTask(this.task);
        return this;
    },
    sort: function () {
        this.task.sort(function (task1, task2) {
            if (task1.dueDate < task2.dueDate) {
                return -1;
            } else if (task1.dueDate > task2.dueDate) {
                return 1;
            } else {
                return 0;
            }
        });
        return this;
    },
    add: function (task) {
        this.task.push(task);
        return this;
    },
    deleteTask: function (i) {
        this.sort();
        this.task.splice(i, 1);
        return this;
    },
    clear: function () {
        this.task = [];
        this.storage.clear();
        return this;
    },
    display: function (div) {
        this.sort();
        var html = "";
        for (var i = 0; i < this.task.length; i++) {
            html += "<p>";
            html += "<a href='#' title='" + i + "'>Delete</a>";
            html += this.task[i].toString();
            html += "</p>";
        }
        div.innerHTML = html;
        var that = this;
        div.querySelectorAll("a").forEach(function (link) {
            link.onclick = function (evt) {
                that.load().deleteTask(this.title).save().display(div);
                evt.preventDefault();
            };
        });
        return this;
    }
};

