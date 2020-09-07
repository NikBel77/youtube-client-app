import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICustomItem, CustomItem } from 'src/app/shared/models/сustom-item.model';
import { pushCustomItem } from '../../../redux/actions/collection.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {

  public cardForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
  });

  constructor(private store: Store, private snackBar: SnackBarService) { }

  public onSubmit(): void {
    const { title, description, imageUrl, link } = this.cardForm.value;
    const item: ICustomItem = new CustomItem(title, description, imageUrl, link);

    this.snackBar.open(`A new card has been created`);
    this.store.dispatch(pushCustomItem({ item }));
    this.cardForm.setValue({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
    });
  }

}
