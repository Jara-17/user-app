import { User } from '@/models/user';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  private _idUserEventEmitter: EventEmitter<string> = new EventEmitter();
  private _findUserByIdEventEmitter: EventEmitter<string> = new EventEmitter();
  private _selectedUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor() {}

  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<string> {
    return this._idUserEventEmitter;
  }

  get findUserByIdEventEmitter(): EventEmitter<string> {
    return this._findUserByIdEventEmitter;
  }

  get selectedUserEventEmitter(): EventEmitter<User> {
    return this._selectedUserEventEmitter;
  }
}
