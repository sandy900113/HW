export class Movie {
    id: number;
    title: String;
    img: String;
    whos: String;
    scheduals: Time[];
}
export class Time {
    id: number;
    month: number;
    day: number;
    week: number;
    hour: number;
    minute: number;
    fullTime: String;

    seat: boolean[][];
}


