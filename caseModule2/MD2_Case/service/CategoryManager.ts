import {Category} from "../model/Category";
export class CategoryManager{
    private categoryList: Category[] = [];

    constructor() {

        let category1 = new Category("C001", "Nonfiction");
        let category2 = new Category("C002", "Novel");
        let category3 = new Category("C003","Science Fiction");
        let category4 = new Category("C004","Detective book");

        this.categoryList.push(category1);
        this.categoryList.push(category2);
        this.categoryList.push(category3);
        this.categoryList.push(category4);
    }

    addFamily(category: Category) {
        this.categoryList.push(category);
    }

    getCategory(): Category[] {
        return this.categoryList;
    }
}

