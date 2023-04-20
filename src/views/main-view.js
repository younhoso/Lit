import {html, css, LitElement} from 'lit';

const initValue = {
  todos : [],
  name : 'Somebody',
  number : null,
  task : '',
}

export class SimpleGreeting extends LitElement {
  static styles = css`
    p { color: red }
    button {color:#fff; border: none; background-color: #333; padding:7px; border-radius:1rem;}
  `;
  
  static get properties() {
    return {
      todos: {type: Array},
      name: {type: String},
      number: {type: Number},
      task: {type: String},
    }
  }

  constructor() {
    super();
    this.todos = initValue.todos;
    this.name = initValue.name;
    this.number = initValue.number;
    this.task = '';
  }

  addTodo(){
    if(this.task){
      this.todos = [...this.todos, {
        task: this.task,
        complete: false
      }]
      this.task = '';
      console.log(this.task)
    };
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  render() {
    return html`
      <section class="html">
        <p>${this.name}!, ${this.number}</p>
        <input type="text" .value="${this.task}" @change="${this.updateTask}" />
        <div class="test" @click="${this.addTodo}">
          <button>추가 버튼</button>
        </div>
        <div class="todos-list">
          ${this.todos.map((todo, idx) => html`
            <div class="todo-item">
              ${todo.task}, ${idx}
            </div>
          `)}
        </div>
      </section>
    `;
  }
}
customElements.define('simple-greeting', SimpleGreeting);