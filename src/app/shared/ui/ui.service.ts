import { Injectable, ViewContainerRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UIService {
    private _drawerState = new BehaviorSubject<void>(null);
    private _appViewContainerRef: ViewContainerRef;
    
    get drawerState() {
        return this._drawerState.asObservable();
    }

    toggleDrawerState() {
        this._drawerState.next(null);
    }
    
    setAppVCRef(vcRef: ViewContainerRef) {
        this._appViewContainerRef = vcRef;
    }

    getAppVCRef() {
        return this._appViewContainerRef;
    }
}