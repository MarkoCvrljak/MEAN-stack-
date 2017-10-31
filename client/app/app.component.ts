import { Component } from '@angular/core';
import { TodosComponent } from './components/todos.component';
import { TodoService } from './services/todo.service';
import { HTTP_PROVIDERS } from '@angular/http'


@Component({
  moduleId:module.id,  
  selector: 'app',
  templateUrl: 'app.component.html',
  directives: [ TodosComponent ],
  providers: [ TodoService, HTTP_PROVIDERS ]
})


export class AppComponent  { 
    
}