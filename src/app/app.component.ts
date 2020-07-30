import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'first-todo';
  tasks: Task[];
  categories: Category[];
  selectedCategory: Category;


  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategory().subscribe(categories => this.categories = categories);
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;

    this.dataHandler.searchTodos(this.selectedCategory, null, null, null).subscribe(todos =>
      this.tasks = todos);
  }

  // onSelectTask(task: Task): void {
  //   console.log(task);
  // }
  onUpdateTasks(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTodos(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => this.tasks = tasks);
    });

  }
}
