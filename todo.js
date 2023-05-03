//User bilgilerini içeren sınıf
//her bir user için id, name ve todoList tanımlanır.
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.todoLists = [];
    }
}

//Users içeren sınıf
//user bilgileri ve userId tanımlanır. userId 1'den başlattık.
class UserList {
    constructor() {
        this.users = [];
        this.userId = 1;
    }

    //yeni user eklemek fonksiyonu
    //her user için userId'yi arttırdık, böylece bir userId bir kez kullanılabilir.
    addUser(name) {
        const user = new User(this.userId++, name);
        this.users.push(user);
        console.log(`User added with ID ${user.id}`);
    }

    //id ile user silme fonksiyonu
    //Eğer user todoList içeriğine sahipse önce tüm todo'ları sonra user silinir.
    //splice() fonksiyonu, bir dizinin içindeki bir veya birden fazla elemanı çıkarmak veya yeni elemanlar eklemek için kullanılır. Fonksiyon, dizinin kendisini değiştirir ve değişiklikler dizi üzerinde kalıcıdır. Yani diziden silinen değeri geri döndürür.
    deleteUserById(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            // Kullanıcının tüm TodoList nesnelerini sil
            this.users[index].todoLists.forEach(todoList => {
                todoList.deleteTodoList();
            });
            this.users.splice(index, 1); //index değerinden başla 1 tane sil
            console.log(`User with ID ${id} deleted`);
        } else {
            console.log(`User with ID ${id} not found`);
        }
    }

    //users listesini yazar
    printUsers() {
        console.log("Users:");
        this.users.forEach(user => {
            console.log(`User ID: ${user.id} - Name: ${user.name}`);
        });
    }
}


//deneme//
// const users = [
//     new User(1, "Bob"),
//     new User(2, "Charlie"),
//     new User(3, "Alice"),
//     new User(4, "Helen"),
//     new User(5, "Isaac"),
//     new User(6, "Julia"),
// ];



//Todo bilgilerini içeren sınıf
//her bir todo için id, title, description, completed ve userId tanımlanır.
class Todo {
    constructor(id, title, description, completed, userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.userId = userId;
    }
}

//Todos içeren sınıf
//todo içeriği, bilgileri ve todoId tanımlanır. todoId 1'den başlattık.
class TodoList {
    constructor() {
        this.todos = [];
        this.todoId = 1;
    }

    //yeni todo eklemek fonksiyonu
    //her todo için todoId'yi arttırdık, böylece bir todoId bir kez kullanılabilir.
    addTodo(title, description, userId) {
        const todo = new Todo(this.todoId++, title, description, false, userId);
        this.todos.push(todo);
        console.log(`Todo added with ID ${todo.id} - User: ${todo.userId}`);
    }

    //id ile todo silme fonksiyonu
    deleteTodoById(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
            console.log(`Todo with ID ${id} deleted`);
        } else {
            console.log(`Todo with ID ${id} not found`);
        }
    }

    //id 'ye göre todo güncelleme fonksiyonu
    //title, description ve completed değiştirilebilir.
    updateTodoById(id, title, description, completed) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.title = title;
            todo.description = description;
            todo.completed = completed;
            console.log(`Todo with ID ${id} updated`);
            console.log(`ID: ${todo.id} - ${todo.title} (${todo.description}) - ${todo.completed ? "Completed" : "Not completed"} - User: ${todo.userId}`);
        } else {
            console.log(`Todo with ID ${id} not found`);
        }
    }

    //todos listesini yazar, description görünmez.
    printTodos() {
        console.log("Todos:");
        this.todos.forEach(todo => {
            const user = userList.users.find(user => user.id === todo.userId);
            console.log(`ID: ${todo.id} - ${todo.title} - ${todo.completed ? "Completed" : "Not completed"} - User: ${user.name}`);
        });
    }

    //todo id'ye göre description gösterir.
    getDescriptionById(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            console.log(`ID: ${todo.id} - ${todo.title} (${todo.description}) - ${todo.completed ? "Completed" : "Not completed"} - User: ${todo.userId}`);
        } else {
            console.log(`Todo with ID ${id} not found`);
        }
    }

    //user id'ye ait todo'ları listeler.
    getTodosByUserId(id) {
        const user = userList.users.find(user => user.id === id);
        if (user) {
            console.log(`Todos for User ID ${id}:`);
            this.todos.forEach(todo => {
                if (todo.userId === id) {
                    console.log(`ID: ${todo.id} - ${todo.title} - ${todo.completed ? "Completed" : "Not completed"} - User: ${user.name}`);
                }
            });
        } else {
            console.log(`User with ID ${id} not found`);
        }
    }
}





/* ----------- Console ----------- */

userList = new UserList();
userList.addUser("Bob");
userList.addUser("Charlie");
userList.addUser("Alice");
userList.addUser("Helen");
userList.addUser("Isaac");
userList.addUser("Julia");

// User added with ID 1
// User added with ID 2
// User added with ID 3
// User added with ID 4
// User added with ID 5
// User added with ID 6

userList.printUsers();

// Users:
// User ID: 1 - Name: Bob
// User ID: 2 - Name: Charlie
// User ID: 3 - Name: Alice
// User ID: 4 - Name: Helen
// User ID: 5 - Name: Isaac
// User ID: 6 - Name: Julia

userList.deleteUserById(4);

// User with ID 4 deleted

userList.deleteUserById(5);

// User with ID 5 deleted

userList.printUsers();

// Users:
// User ID: 1 - Name: Bob
// User ID: 2 - Name: Charlie
// User ID: 3 - Name: Alice
// User ID: 6 - Name: Julia

todoList = new TodoList();
todoList.addTodo("Buy milk", "Remember to buy milk from the grocery store", 1);
todoList.addTodo("Pay bills", "Pay the electricity, water and gas bills", 2);
todoList.addTodo("Learn JavaScript", "Finish the JavaScript course on Codecademy", 1);
todoList.addTodo("Go to the gym", "Hit the gym for a morning workout", 1);
todoList.addTodo("Call mom", "Call mom to wish her a happy birthday", 3);
todoList.addTodo("Plan vacation", "Research vacation destinations and plan itinerary", 1);
todoList.addTodo("Buy new phone", "Research and purchase a new smartphone", 3);

// Todo added with ID 1 - User: 1
// Todo added with ID 2 - User: 2
// Todo added with ID 3 - User: 1
// Todo added with ID 4 - User: 1
// Todo added with ID 5 - User: 3
// Todo added with ID 6 - User: 1
// Todo added with ID 7 - User: 3

todoList.printTodos();

// Todos:
// ID: 1 - Buy milk - Not completed - User: Bob
// ID: 2 - Pay bills - Not completed - User: Charlie
// ID: 3 - Learn JavaScript - Not completed - User: Bob
// ID: 4 - Go to the gym - Not completed - User: Bob
// ID: 5 - Call mom - Not completed - User: Alice
// ID: 6 - Plan vacation - Not completed - User: Bob
// ID: 7 - Buy new phone - Not completed - User: Alice

todoList.deleteTodoById(1);

// Todo with ID 1 deleted

todoList.deleteTodoById(5);

// Todo with ID 5 deleted

todoList.printTodos();

// Todos:
// ID: 2 - Pay bills - Not completed - User: Charlie
// ID: 3 - Learn JavaScript - Not completed - User: Bob
// ID: 4 - Go to the gym - Not completed - User: Bob
// ID: 6 - Plan vacation - Not completed - User: Bob
// ID: 7 - Buy new phone - Not completed - User: Alice

todoList.updateTodoById(2, "Pay bills", "Pay the electricity, water and gas bills", true);

// Todo with ID 2 updated
// ID: 2 - Pay bills (Pay the electricity, water and gas bills) - Completed - User: 2

todoList.getDescriptionById(4);

//ID: 4 - Go to the gym (Hit the gym for a morning workout) - Not completed - User: 1

todoList.getTodosByUserId(1); 

// Todos for User ID 1:
// 3 - Learn JavaScript - Not completed - User: Bob
// 4 - Go to the gym - Not completed - User: Bob
// 6 - Plan vacation - Not completed - User: Bob


