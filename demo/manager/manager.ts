import {IManager} from "./interfaceManage";
import {Employee} from "../employee/employee";

export class EmployeeManager implements IManager<Employee>{
    employeeList:Employee[] = [];
    add(data: Employee): void {
        this.employeeList.push(data)
    }

    edit(id: number, data: Employee): void {
    }

    findByID(id: number): number {
        return 0;
    }

    remove(id: number): void {
    }

    showAll(): Employee[] {
        return [];
    }

}