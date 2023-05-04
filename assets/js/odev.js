const users = [
  { name: 'Kemal', age: 74, id: 1 },
  { name: 'Ömer', age: 56, id: 2 },
  { name: 'Tanju', age: 70, id: 3 },
]

const secondTodoList = [
  {
    title: 'Mutfağı temizle',
    completed: true,
    userId: 2,
  },
  {
    title: 'Ödevini yap',
    completed: false,
    userId: 3,
  },
  {
    title: 'Akşam yemeğini hazırla',
    completed: false,
    userId: 2,
  },
  {
    title: 'İngilizce çalış',
    completed: true,
    userId: 1,
  },
]

//forEach ile her bir object'e id ekliyoruz.
secondTodoList.forEach(function (todo, index) {
  todo.id = index + 1
})

//secondTodoList array'i eğer 0'dan büyük bir array ise secondTodoList'in son item'ini bul.
let lastId =
  secondTodoList.length > 0 ? secondTodoList[secondTodoList.length - 1].id : 0

//secondTodoList'e yeni bir item eklerken lastId ile son itemi bulmuştuk şimdi o son item'ib id'sini 1 arttır. Ve yeni eklediğin item'in id'sine veren function'u yazdık.
function addTodoItem(todoItem) {
  lastId++
  todoItem.id = lastId
  secondTodoList.push(todoItem)
}

//Burada function'u çağırıp yeni item'in parametrelerini girdik.
addTodoItem({
  title: 'Alışveriş yap',
  completed: false,
  userId: 1,
})

//Tüm todos'u dönüp id'ye verdiğim argümanı eşlediği an o object'i silecek. Break verme sebebimiz bulduğu an döngüden çıkabilir.
function deleteTodo(todos, id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos.splice(i, 1) //Burada ilk parametre start, ikinci parametre kaldırılacak item sayısı.
      break
    }
  }
}

//Tüm todos'u dönüp istediğim id'ye geldiğinde if'in içine girecek. İf'in içine girdiği zaman spread operatöryle value'muzu güncellemiş oluruz.
function editTodo(todos, id, changeValue) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i] = { ...todos[i], ...changeValue }
      break
    }
  }
}

//todo'nun id'sini girdiğimizde bize todo'nun title'ini geri döner.
function detayKey(id, todos) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      return todos[i].title
    }
  }
}

//Users ve todos'u eşleştireceğim için yeni bir array oluşturdum. forEach ile user.id ve todo.userId si aynı olanları eşleştirdim. ilk 3 pair'im todos'dan geldiği için oradan çektim. 4.pair'im users'dan geldiği için users'dan çektim ve matchedTodos'a bu pairleri pushladım.
function matchTodosWithUsers(users, todos) {
  const matchedTodos = []

  todos.forEach((todo) => {
    const user = users.find((user) => user.id === todo.userId)
    if (user) {
      matchedTodos.push({
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
        username: user.name,
      })
    }
  })
  return matchedTodos
}

function listTodos(filter = 'all', todos) {
  for (let todo of todos) {
    if (filter === 'completed' && todo.completed === false) {
      continue
    }

    if (filter === 'uncompleted' && todo.completed === true) {
      continue
    }

    let status = 'tamamlanmadı'
    if (todo.completed) {
      status = 'tamamlandı'
    }

    console.log(`Todo: ${todo.title} | ${status} | ${todo.username}`)
  }
}

//Console
//listTodos("all", matchTodosWithUsers(users, secondTodoList)) => Hepsini döndürür.
//listTodos("completed", matchTodosWithUsers(users, secondTodoList)) => Tamamlananları döndürür.
//listTodos("uncompleted", matchTodosWithUsers(users, secondTodoList)) => Tamamlanmayanları döndürür.

// addTodoItem({
//   title: 'Alışveriş yap',
//   completed: false,
//   userId: 1,
// })  => Yeni item ekleriz.

//deleteTodo(secondTodoList, 3) => id'si 3 olanı siler.
//detayKey(2, secondTodoList) => id'si 2 olanın title'ini döndürür.
