import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdminPanelService {

    listUsers: { id, name, phone_no, status }[] = [];
    constructor() { }

    getListUsers() {
        // send http to get users
        this.listUsers = [
            { id: 1, name: 'Ahsan', phone_no: '0300234000', status: 'active' },
            { id: 2, name: 'Asad', phone_no: '0300000000', status: 'active' },
            { id: 3, name: 'Ali', phone_no: '0300000000', status: 'disabled' },
            { id: 4, name: 'Mahmood', phone_no: '0300000000', status: 'active' },
            { id: 5, name: 'Ahsan', phone_no: '0300000000', status: 'active' },
            { id: 6, name: 'Hamze', phone_no: '0300000000', status: 'active' },
            { id: 7, name: 'Ahmed', phone_no: '0300000000', status: 'disabled' },
            { id: 8, name: 'Ahsan', phone_no: '0300000000', status: 'active' },
            { id: 9, name: 'Ahsan', phone_no: '0300000000', status: 'disabled' },
            { id: 10, name: 'Ahsan', phone_no: '0300000000', status: 'active' },
        ];
        return this.listUsers;
    }

    getUserData(id) {
        return this.listUsers.find(user => user.id == id);
    }

}