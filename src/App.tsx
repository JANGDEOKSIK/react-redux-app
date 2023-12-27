import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import { fetchPosts } from "./actions/posts"

type Props = {
  value: any;
  onIncrement: () => void;
  onDecrement: () => void;
}

interface Post {
  userId: number,
  id: number,
  title: string
}

function App({ value, onIncrement, onDecrement }: Props) {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter);
  const todos: string[] = useSelector((state: RootState) => state.todos);
  const posts:Post[] = useSelector((state: RootState) => state.posts)

  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch]);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  }
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: todoValue });
    setTodoValue("");
  }
  return (
    <div className="App">
      Clicked: {counter}times
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <hr />
      <ul>
        {
          todos.map((todo, index) => {
            return (
              <li key={index}>{todo}</li>
            )
          })
        }
      </ul>
      <form onSubmit={addTodo}>
        <input type="text" value={todoValue} onChange={handleChange} />
        <input type="submit" value={"제출"} />
      </form>


      <ul>
        {
          posts.map((post, index) => {
            return (
              <li key={index}>{post.title}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
