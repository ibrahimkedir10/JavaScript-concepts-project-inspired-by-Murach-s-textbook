document.addEventListener("DOMContentLoaded", function () {
    function tasklist() {
        const inputTask = document.getElementById("input");
        const addTask = document.getElementById("addTask");
        const clearTask = document.getElementById("clearTask");
        const textArea = document.getElementById("textArea");

        addTask.onclick = function () {
            const task = inputTask.value;
            if (task.trim() !== "") {
                textArea.value += task + "\n";
                localStorage.textArea = textArea.value;
                inputTask.value = "";
            } else {
                alert("Enter a task");
            }
        };

        clearTask.onclick = function () {
            textArea.value = "";
            localStorage.removeItem(textArea);
        };
    }

    tasklist();
});