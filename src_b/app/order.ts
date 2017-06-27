export class Order {
    id: number;
    movie_id: number;
    time_id: number;
    seat_number: number;

    name: String;
    phone: String;
    email: String;

    constructor(movie_id: number ,time_id: number ,seat_number: number){
        this.id=-1;
        this.movie_id=movie_id;
        this.time_id=time_id;
        this.seat_number=seat_number;

        this.name="";
        this.phone="";
        this.email="";
    }
}

