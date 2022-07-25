import React, { useState } from 'react';
import './App.css';

function App() {

  const [inputValue, setInputValue] = useState("");
  // todo配列オブジェクトの更新用に用意。プロパティはinputValue, id, checkedの3つを更新
  const [todos, setTodos] = useState<Todo[]>([]);
  // ユニークな連番を管理
  const [id, setId] = useState(0);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: id,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
    setId(id+1);
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    
    setTodos(newTodos);
  };

  // checkboxをクリックした時に呼ばれる関数
  const handleCheckd = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // todoを削除する関数
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} className="inputText" />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="text" onChange={(e) => handleEdit(todo.id, e.target.value)} className="inputText" value={todo.inputValue} disabled={todo.checked} />
              <input type="checkbox" onChange={() => handleCheckd(todo.id)} />
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
