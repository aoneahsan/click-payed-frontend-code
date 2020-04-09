import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { SystemService } from "../system.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _systemService: SystemService, private _http: HttpClient) {}

    updateProfile(data) {
        // console.log(data);
        // console.log("api URL", this._systemService.getApiRootURL() + "upload");
        const name = "Ahsan Mahmood";
        // return this._http.post<any>(
        //     this._systemService.getApiRootURL() + "upload",
        //     name
        // );
        return this._http.post<any>(
            this._systemService.getApiRootURL(),
            data
        );
    }

}