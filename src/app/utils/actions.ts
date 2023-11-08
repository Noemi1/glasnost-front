import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  open: BehaviorSubject<boolean> = new BehaviorSubject(false);

  toggle() {
    this.open.next(!this.open.value);
  }
}
