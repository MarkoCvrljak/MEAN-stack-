"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var todo_service_1 = require('../services/todo.service');
require('rxjs/add/operator/map');
var TodosComponent = (function () {
    function TodosComponent(todoService) {
        this.todoService = todoService;
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todos = [];
        this.todoService.getTodos()
            .subscribe(function (todos) { return _this.todos = todos; });
    };
    TodosComponent.prototype.addTodo = function ($event, todoText) {
        var _this = this;
        if ($event.which === 1) {
            var result;
            var newTodo = {
                text: todoText.value,
                isCompleted: false
            };
            result = this.todoService.saveTodo(newTodo);
            result.subscribe(function (x) {
                _this.todos.push(newTodo);
                todoText.value = "";
            });
        }
    };
    TodosComponent.prototype.updStatus = function (todo) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        this.todoService.updTodo(_todo).subscribe(function (data) {
            todo.isCompleted = !todo.isCompleted;
        });
    };
    TodosComponent.prototype.setEdit = function (todo, state) {
        if (state) {
            todo.isEditMode = state;
        }
        else {
            delete todo.isEditMode;
        }
    };
    TodosComponent.prototype.updTodo = function ($event, todo) {
        var _this = this;
        if ($event.which === 13) {
            todo.text = $event.target.value;
            var todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this.todoService.updTodo(todo).subscribe(function (data) {
                _this.setEdit(todo, false);
            });
        }
        console.log();
    };
    TodosComponent.prototype.delTodo = function (todo) {
        var todos = this.todos;
        this.todoService.deleteTodo(todo._id).subscribe(function (data) {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id == todo.id) {
                    todos.splice(i, 1);
                }
            }
        });
    };
    TodosComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'todos',
            templateUrl: 'todos.component.html',
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService])
    ], TodosComponent);
    return TodosComponent;
}());
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map