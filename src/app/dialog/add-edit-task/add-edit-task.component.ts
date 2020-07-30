import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';
import { Task } from 'src/app/model/Task';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  title: string;
  task: Task;
  tmpTitle: string;

  ngOnInit(): void {
    this.task = this.data[0];
    this.title = this.data[1];

    this.tmpTitle = this.task.title;
  }

  onConfirm(): void {

    this.task.title = this.tmpTitle;

    this.dialogRef.close(this.task);

  }

  onCancel(): void {

    this.dialogRef.close(null);

  }
}
