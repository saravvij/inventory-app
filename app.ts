import {Component, EventEmitter } from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

/**
 * Navigation component goes here
 */
@Component({
    selector: "nav",
    template: `<div>Navigation goes here</div>`
})
export class Navigation {
    constructor(){}
}

/**
 * Breadcrump component goes here
 */
@Component({
    selector: "breadcrump",
    template: `<div>Breadcrump goes here</div>`
})
export class Breadcrump {
    constructor(){}
}


/**
 * Product Model 
 */
export class Product {
    
    constructor(
        public sku: string,
        public name: string,
        public imageUrl: string,
        public departments: string[],
        public price: number
    ){}
}


@Component({
    selector: 'price-display',
    inputs: ['price'],
    template:`
        <div class="price-display">\${{ price }}</div>
    `
})
export class PriceDisplay{
    price: number;
}


@Component({
    selector: 'product-img',
    inputs:['product'],
    host: {class: 'ui small image'},
    template:`<img [src]="product.imageUrl" class="product-image"/>`
})
export class ProductImage{
    product: Product;
    constructor(){}
}


@Component({
    selector: 'product-dept',
    inputs:['product'],
    template:`
        <div class="product-department">
            Product depatment appears here
        </div>
    `
})
export class ProductDepartment{
    product: Product;
    constructor(){}
}



/**
 * Product Row component has three more components
 */
@Component({
    selector: 'product-row',
    directives: [ProductImage, ProductDepartment, PriceDisplay],
    inputs: ['product'],
    template: `
        <product-img [product] = "product"></product-img>
        <div class="content">
            <div class="header">{{product.name}}</div>
            <div class="meta">
                <div class="product-sku">SKU# {{ product.sku }}</div>
            </div>
            <div class="description">
                <product-dept [input] = "product"></product-dept>
            </div>
            <price-display [price] = "product.price"></price-display>
        </div>
    `
})

export class ProductRow {
    product: Product;
 
    constructor(){
    }
   
}


/**
 * Product List component goes here
 */
@Component({
    selector: 'product-list',
    directives: [ProductRow],
    inputs: ['productList: productList'],
    outputs: ['onProductSelected'],
    template: `
    <div class="ui items">
        <product-row *ngFor="#p of productList" 
            [product] = 'p'
            (click) = 'clicked(p)'>
        </product-row>
    </div>`
})
export class ProductList{
    
    productList: Product[];
    currentProduct: Product;
    onProductSelected: EventEmitter <Product>;
    
    constructor(){
        this.onProductSelected = new EventEmitter();
    }
    
    clicked(product: Product): void {
        this.currentProduct = product;
        this.onProductSelected.emit(this.currentProduct);
    }

}



/**
 * App EntryPoint starts here
 */
@Component({
  selector: 'inventory-app',
  directives: [ProductList],
  template: `
    <div class="inventory-app">
        <product-list
            [productList] = "products" 
            [onProductSelected] = "onProductSelection($event)"
        ></product-list>
    </div>
  `
}) 

class InventoryApp   {
    products: Product[];
    
    constructor() { 
       this.products = [
         new Product('MYSHOES', 'Black Running Shoes',
            '/resources/images/products/black-shoes.jpg',
            ['Men', 'Shoes', 'Running Shoes'],
            109.99),
        new Product(
            'NEATOJACKET', 'Blue Jacket',
            '/resources/images/products/blue-jacket.jpg',
            ['Women', 'Apparel', 'Jackets & Vests'],
            238.99),
        new Product(
            'NICEHAT', 'A Nice Black Hat',
            '/resources/images/products/black-hat.jpg',
            ['Men', 'Accessories', 'Hats'],
            29.99)            
       ];
    }
    
    onProductSelection (product: Product) : void{
        console.log("Product selected : ", product);
    }
}

bootstrap(InventoryApp);