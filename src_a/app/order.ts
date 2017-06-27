export class Order {
    static id_total:number=1;
    id: number;
    movie_id: number;
    time_id: number;
    seat_number: number;

    name: String;
    phone: String;
    email: String;

    constructor(movie_id: number ,time_id: number ,seat_number: number){
        this.id=Order.id_total++;
        this.movie_id=movie_id;
        this.time_id=time_id;
        this.seat_number=seat_number;

        this.name="";
        this.phone="";
        this.email="";
    }
}

