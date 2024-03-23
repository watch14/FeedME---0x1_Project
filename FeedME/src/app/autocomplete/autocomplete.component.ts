import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface State {
  flag: string;
  name: string;
  population: string;
}

/**
 * @title Autocomplete overview
 */
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe,
    CommonModule
  ],
})
export class AutocompleteOverviewExample {
  stateCtrl = new FormControl('');
  filteredStates: Observable<State[]>;
  selectedStates: State[] = [];

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
  ];

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state && state.length >= 3 ? this._filterStates(state) : []))
    );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().includes(filterValue)).slice(0, 2);
  }

  removeSelectedState(state: State) {
    const index = this.selectedStates.indexOf(state);
    if (index >= 0) {
      this.selectedStates.splice(index, 1);
    }
  }

  addSelectedState(state: State) {
    if (!this.selectedStates.some(s => s.name === state.name)) {
      this.selectedStates.push(state);
      this.stateCtrl.setValue(''); // Reset the input text
    }
  }
}