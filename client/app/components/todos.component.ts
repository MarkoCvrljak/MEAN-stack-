import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import 'rxjs/add/operator/map';
import { Todo } from '../todo';
@Component({
  moduleId:module.id,  
  selector: 'todos',
  templateUrl: 'todos.component.html',
})


export class TodosComponent implements OnInit  { 
    todos: Todo[];
    
    constructor(private todoService: TodoService){

    }

    ngOnInit(){
        this.todos = [];
        this.todoService.getTodos()
        .subscribe(todos => this.todos = todos)
    }

    addTodo($event, todoText){
        if($event.which === 1){
            var result;
            var newTodo = {
                text: todoText.value,
                isCompleted: false
            };

            result = this.todoService.saveTodo(newTodo);
            result.subscribe(x => {
                this.todos.push(newTodo)
                todoText.value = "";
            })
        }
    }

    updStatus(todo){
        var todo:any = {
            id: todo.id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };

        this.todoService.updTodo(todo).subscribe(data => {
            todo.isCompleted = !todo.isCompleted;
        });
    }

    setEdit(todo, state){
        if(state){
            todo.isEditMode = state;
        }else{
            delete todo.isEditMode;
        }
    }

    updTodo($event, todo){
        if($event.which === 13){
            todo.text = $event.target.value;
            var todo:any = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };

            this.todoService.updTodo(todo).subscribe(data => {
                this.setEdit(todo, false);
            });
        }
        console.log()
    }

    delTodo(todo){
        var todos = this.todos;

        this.todoService.deleteTodo(todo._id).subscribe(data => {
            for(var i = 0; i < todos.length; i++){
                if(todos[i].id == todo.id){
                        todos.splice(i, 1);
                }
            }
            
        });
    }
}