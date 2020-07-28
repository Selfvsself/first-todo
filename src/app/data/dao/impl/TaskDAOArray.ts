import {TaskDAO} from '../api/TaskDAO';
import {Task} from '../../../model/Task';
import {Category} from '../../../model/Category';
import {Priority} from '../../../model/Priority';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class TaskDAOArray implements TaskDAO {
  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(todo => todo.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {

    let allTasks = TestData.tasks;

    if (category != null) {
      allTasks = allTasks.filter(value => value.category === category);
    }


    return of(allTasks);
  }

  update(T): Observable<Task> {
    return undefined;
  }

}
