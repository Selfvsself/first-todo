import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AddEditTaskComponent} from '../../dialog/add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  tasks: Task[];

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  completedTask = new EventEmitter<Task>();

  // @Output()
  // selectedTask = new EventEmitter<Task>();


  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  fillTable(): void {
    if (this.dataSource == null) {
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();


    this.dataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.id : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };
  }

  getPriorityColor(task: Task): string {
    if (task.completed) {
      return '#f9f9f9';
    }
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff';
  }

  private addTableObjects(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(AddEditTaskComponent, {data: [task, 'Редактирование задачи'], autoFocus: false});
    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.deleteTask.emit(task);
      } else if (result as Task) {
        this.updateTask.emit(result);
      }
    });
  }

  // ngAfterViewInit(): void {
  //   this.addTableObjects();
  // }
}
