import {Category} from "../model/Category";
export class CategoryManager{
    private categoryList: Category[] = [];


    addCategory(category: Category) {
        this.categoryList.push(category);
    }

    getCategory(): Category[] {
        return this.categoryList;
    }
    deleteCategory(index:number):void{
        this.categoryList.splice(index)
    }
}

