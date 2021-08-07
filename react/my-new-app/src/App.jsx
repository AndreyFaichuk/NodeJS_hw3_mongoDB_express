import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";


const Form = (props) => {
    const [createdTodo, setTodo] = useState(false)

    const clear = () => {
        setTodo(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const{name, status} = e.target.elements

            let obj = {
                name: name.value,
                status: status.value,
            }

           const {data} = await axios.post('http://localhost:3000/todo', obj)

            props.state(oldState => [...oldState, data])

            name.value = ''
            status.value = ''
            setTodo(true)
            setTimeout(clear, 2000)
    }


    return(
        <>
            <form action="" onSubmit={handleSubmit} className="forma">
                <h2>Create a Todo</h2>
                <input name="name" type="text"  placeholder="enter name" />
                <input name="status" type="text" placeholder="enter status" />

                <button type="submit" className="post">POST NEW</button>
                {createdTodo ? <h4 className='greenFont'>Todo have been created successfully!</h4> : ''}
            </form>
        </>
    )
}

const Todo = (props) => {
    const [showEdit, setShowEdit] = useState(false)

    const deleteTodo = async () => {

        let id = props.data._id

        await axios.delete('http://localhost:3000/todo/' + id)

        const {data} = await axios.get('http://localhost:3000/todo')

        props.state(data)
    }

    const editTodoShow = () => {
        setShowEdit(true)
    }

    const editTodoClose = () => {
        setShowEdit(false)
    }

    const updateTodo = async (e) => {
        e.preventDefault()

        const{name, status} = e.target.elements

        let body = {
            name: name.value,
            status: status.value
        }

        let id = props.data._id

        await axios.patch('http://localhost:3000/todo/' + id, body)

        const {data} = await axios.get('http://localhost:3000/todo')

        props.state(data)

        setShowEdit(false)

    }

    return(
        <>
            { showEdit ?
                <div className="users">
                    <form action="" onSubmit={updateTodo} className="forma-new">
                    <input name="name" type="text"  placeholder="enter new name"/>
                    <input name="status" type="text" placeholder="enter new status" />
                    <button type="button" className="updateButton" onClick={editTodoClose}>Back to Todo</button>
                    <button type="submit" className="updateButton-green">Update!</button>
                    </form>
                </div>

                :

                <div className="users">
                    <p>Name: <span>{props.data.name}</span></p>
                    <p>Status: <span>{props.data.status}</span></p>
                    <p>Id: <span>{props.data._id}</span></p>
                <button type="button" className="deleteButton" onClick={deleteTodo}>Delete Todo</button>
                <button type="button" className="updateButton" onClick={editTodoShow}>Update Todo</button>
            </div> }

        </>
    )
}

function App() {
  const [isLoaded, setIsLoaded] = useState(true)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetchPromise = fetch("http://localhost:3000/todo")
    fetchPromise
        .then(res => res.json())
        .then(users => setTodos(users))
        .finally(() => setIsLoaded(false))
  }, [])


  return (
      <>
          <div className="Form">
              <Form state = {setTodos}/>
              {todos.length === 0 ? <h4>There are no todos yet</h4> : ''}
          </div>

        <div className="App">
          {isLoaded ? <h1 className="load">Loading...</h1> : ''}
          {todos.map((todos) => <Todo key = {'good_' + todos._id} data = {todos} state = {setTodos}/>)}
        </div>
      </>
  );
}

export default App
