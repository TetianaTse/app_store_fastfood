export class Hamburger {
    constructor(burger, sizeHamb, stuffHamb) {
        this.burger = burger;
        this.sizeHamb = sizeHamb;
        this.stuffHamb = stuffHamb;
    }

    static size = [
        {name: "Small", price: 50, calories: 20,},
        {name: "Big", price: 100, calories: 40,}
    ];
 
    static stuffing = {
        Tomatoes: {name:'Tomatoes', price: 20, calories: 10,},
        Salad: {name:'Salad', price: 15, calories: 5,},
        Potatoes: {name:'Potatoes', price: 20, calories: 20,},
        Cheese: {name:'Cheese', price: 20, calories: 20,}
    };

    #totalPrice = 0;

    showBurger() {
      let myOrderHamb = {};
        if (this.stuffHamb !== undefined && this.stuffHamb !== null) {
          myOrderHamb = {name: this.burger, size: this.sizeHamb.name, stuffing: this.stuffHamb.name, price: this.#totalPrice};
          console.log(`Name: ${this.burger} Size: ${this.sizeHamb.name}, Stuffing: ${this.stuffHamb.name}, Price: ${this.#totalPrice}`);
        } else {
          myOrderHamb = {name: this.burger, size: this.sizeHamb.name, stuffing: 'no', price: this.#totalPrice};
          console.log(`Name: ${this.burger} Size: ${this.sizeHamb.name}, Stuffing: no, Price: ${this.#totalPrice}`);
        }
        return myOrderHamb;
    }
    changeSize(value) {
      if(value === 'big') {
        this.sizeHamb = Hamburger.size[1];
      } else {
        this.sizeHamb = Hamburger.size[0];
      }
    }
    changeStuffing(value) {
      if(typeof value === 'string') {
        this.stuffHamb = Hamburger.stuffing[value];
      } else {
        this.stuffHamb = undefined;
      }
    }

    calculatePrice(value) {
        let stuffPrice = 0;
        if (this.stuffHamb !== undefined) {
          stuffPrice += this.stuffHamb.price;
        }
        this.#totalPrice = value + this.sizeHamb.price + stuffPrice;
        return this.#totalPrice;
    }
}