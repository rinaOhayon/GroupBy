import { Injectable } from '@angular/core';
import { Groups } from '../models/groups';
import { GroupView } from '../models/group-view';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor() { }
  GroupBasket:GroupView[]=[];
}
