import React, { Component } from 'react';
import './App.css';


// TodoItem here is just a stateless functional component.
// Honestly, I could have just left it as an li
// There's really not a lot going on here, actually,
// but just to have multiple components going on
// So this TodoItem just takes in a prop for text and then uses it inside.
// Now remember {text} is destructuring parameter. // props and props.text

const TodoItem = ({text}) => (
  <li>{text}</li>
);

class App extends Component {
  constructor(props) { // props obj is exactly the same as the props that we pass down from component to component
    super(props); // we call the parent constructor by calling super props
    this.state = {
      todos: [], // the array of todos that we're storing
      newTodo: '' // newTodo will be a content of that input
    }
  };
  // Controlled component with Update
  handleSubmit(event) {
    // The first thing that you always wanna do with the summit event
    // is prevent default. This is just standard for the browser cuz
    // if you dont prevent default, it will submit HTTP request
    // to the server and the whole page will refresh and
    // you'll lose all your state.
    event.preventDefault();
    // the next thing we'll do is update the todos array
    // this.state.todos keeps track of all the inputs I've submitted.
    // I'll just add that state, this.state.newTodo, to the end.
    // this.state.newTodo will be equal to the value in the form value.
    //spread operator gives us a new method for combining arrays:
    const todos = [...this.state.todos, this.state.newTodo];
    this.setState({todos, newTodo: ''});
    // I'm updating the todos here and, I'm also updating the input text to be
    // empty again so that when I submit, my form will be cleared out.
  }
  // onHandleChange(event) {ุ
  //  console.log(event.target.value);
  // }
  render() {
    const {newTodo} = this.state; // we're grabbing a newTodo out of the state
    // we need a newTodo for the value in our input.
    // so down here, the JSX is a form inside the form we've got an input 
    // for that newTodo we want to type.

    //  The map() method creates a new array with the results of
    //  calling a provided function on every element in the calling array.

    // we're going over each todo and list of todos and mapping them to jsx element.
    // and this TodoItem here I have up top. Let's talk about that.
    const todos = this.state.todos.map((todo, index) => 
    <TodoItem key={index} text={todo}/>);

    // Handing User Events with Controlled Components
    // onChange - an onchange attribute is an event listener
    // to the object for the Event change.
    // onChange handler is fired on every key stroke.
    // onChange event will be invoked anytime you type
    // a single key inside that input. Then, this.setState will be invoked.
    // Passing Arguments to Event Handlers
    // e.target.value - get the value of an input field
    // Note that the name in the form here has to match the key in my state.
    // name="newTodo"

    return (
      <div className="App">
        <h1>A simple Todo-list</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input 
            className="todo-input"
            autoComplete="off"
            type="text"
            name="newTodo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => this.setState({[e.target.name]: e.target.value})}
          />
          <button type="submit" className="save-button">Add</button>
        </form>
        <div className="todo-content">
          <ol>
            {todos}
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
