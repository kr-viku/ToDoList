class Task {
    constructor(text) {
      this.text = text;
      this.isCompleted = false;
    }
  }
  
  class TodoList {
    constructor() {
      this.body = document.getElementsByTagName("body")[0];
      this.body.style.background = "#659DBD";
  
      this.tasks = JSON.parse(localStorage.getItem("tasks")) || [
        { text: "Good Day !!!", isCompleted: false },
      ];
      console.log(this.tasks);
  
      this.render(this.tasks);
    }
  
    render(taskArray) {
      this.body.innerHTML = "";
      let element = document.createElement("div");
      element.style.display = "block";
      element.style.justifyContent = "center";
      element.innerHTML = "TodoList";
      element.style.textAlign = "center";
      element.style.fontSize = "3rem";
      element.style.justifyItems = "center";
      element.style.color = "Green";
      this.body.appendChild(element);
  
      this.addPromptFormForAddingTask();
      this.addPreTasks(taskArray);
    }
  
    addPromptFormForAddingTask() {
      const newLine = document.createElement("br");
      this.body.appendChild(newLine);
      const div = document.createElement("div");
      div.style.justifyContent = "center";
      div.style.display = "flex";
      const input = document.createElement("input");
      input.style.background = "white";
  
      const button = document.createElement("button");
      input.className = "addTaskInput";
      input.autofocus = true;
      input.placeholder = "Add Task...";
      button.innerHTML = "Add Now";
  
      button.addEventListener("click", () => {
        this.addTaskToList(input.value);
      });
  
      div.appendChild(input);
      div.appendChild(button);
      this.body.appendChild(div);
    }
  
    addTaskToList(text) {
      if (text === "" || text == null) {
        alert("It would be too easy for you");
      } else {
        let task = new Task(text);
        this.tasks.push(task);
        this.render(this.tasks);
      }
    }
  
    addPreTasks(chosenTaskArray) {
      this.body.appendChild(document.createElement("br"));
      console.log(chosenTaskArray[0]);
      const ul = document.createElement("ul");
      ul.className = "todo-list";
      // let i = 0;
      for (let i = 0; i < chosenTaskArray.length; i++) {
        const li = document.createElement("li");
        const removeTaskButton = document.createElement("div");
        const removeIcon = document.createTextNode("\u00D7");
  
        li.classList.add("task");
        removeTaskButton.className = "delete-task-button";
  
        li.addEventListener("click", (event) => {
          event.target.classList.toggle("task--completed");
          chosenTaskArray[i].isCompleted = true;
        });
  
        removeTaskButton.addEventListener("click", () => {
          ul.removeChild(li);
          //Asssignment
          this.tasks = this.tasks
            .slice(0, i)
            .concat(this.tasks.slice(i + 1, this.tasks.length));
          this.saveTasksinLocalStorage();
          this.render(this.tasks);
        });
        removeTaskButton.appendChild(removeIcon);
        li.innerHTML = chosenTaskArray[i].text;
        li.appendChild(removeTaskButton);
        ul.appendChild(li);
      }
      this.body.appendChild(ul);
      this.saveTasksinLocalStorage();
    }
  
    saveTasksinLocalStorage() {
      if (this.tasks.length != 0)
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      else localStorage.clear();
    }
  }
  
  const todo = new TodoList();