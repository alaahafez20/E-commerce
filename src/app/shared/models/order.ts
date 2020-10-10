
export class Order {

    date: string;
    Carts: any[];
    cost: number;

    constructor(public userUid: string, public shipping: any, carts: any[]) {

        let d = new Date();
        let dateFormat = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);

        this.date = dateFormat
        this.Carts = carts.map(i => {
            return {
                title: i.payload.val().title,
                price: i.payload.val().price,
                quantity: i.payload.val().quantity,
            }
        })
        this.cost = this.calculateCost()
    }

    calculateCost() {
        let total = 0;
        for (let i = 0; i < this.Carts.length; i++) {
            let totalPrice = this.Carts[i].price * this.Carts[i].quantity
            total += totalPrice
        }
        return total
    }

}