import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({

    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']

})
export class ProductListComponent implements OnInit{

    pageTitle: string = 'Product List';
    imageWidth : number = 50;
    imagemargin : number = 2;
    showImage : boolean = false;
    private _listFilter: string;
    errorMessage: string;
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts : IProduct[];
    products: IProduct[] ;

    toggleImage() : void{
        this.showImage = !this.showImage;
    }

    constructor(private productService : ProductService){

        
        
    }

    ngOnInit(): void{
        this.productService.getProducts().subscribe(

            products =>{ this.products = products
                this.filteredProducts = this.products;    
            },
            error => this.errorMessage = <any>error
        );
        
    }

    performFilter(filterBy : string){
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct) =>
                            product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);

    }

    onRatingClicked(message : string) : void{

        this.pageTitle = 'Product List : ' + message;
    }
}