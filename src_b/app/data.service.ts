import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { DataOfMovie } from './data-of-movie';
import { Order } from './order';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  preBookOrders: Order[];
  checkOrder: Order;
  checkOrders: Order[];
  tryString: String;

  private headers = new Headers({'Content-Type': 'application/json'});
  private ordersUrl = 'api/DataOfOrders';  // URL to web api

  constructor(private http: Http){

  }

  //Orders-HTTP-------------------------------------------
  getOrders(): Promise<Order[]> {
    // return Promise.resolve(DataOfOrder);
     return this.http.get(this.ordersUrl)
               .toPromise()
               .then(response => response.json().data as Order[])
               .catch(this.handleError);
  }

  update(order: Order): Promise<Order> {
    const url = `${this.ordersUrl}/${order.id}`;
    return this.http
      .put(url, JSON.stringify(order), {headers: this.headers})
      .toPromise()
      .then(() => order)
      .catch(this.handleError);
  }

  create(order: Order): Promise<Order> {
    return this.http
      .post(this.ordersUrl, JSON.stringify({
        movie_id:order.movie_id,
        time_id:order.time_id,
        seat_number:order.seat_number,
        name:order.name,
        phone:order.phone,
        email:order.email
      }), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Order)
      .catch(this.handleError);
  }


  //Moives-NOT-HTTP------------------------------------------
  getMovies(): Promise<Movie[]> {
    return Promise.resolve(DataOfMovie);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getMovie(id: number): Promise<Movie> {
    return this.getMovies()
             .then(DataOfMovie => DataOfMovie.find(Movie => Movie.id === id));
  }
  getMovieByTitle(title: String): Promise<Movie> {
    return this.getMovies()
             .then(DataOfMovie => DataOfMovie.find(Movie => Movie.title === title));
  }


  //PreOrders--------------------------------------------
  storePreBookOrders(preBookOrders: Order[]){
    this.preBookOrders=preBookOrders;
  }
  getPreBookOrders(): Promise<Order[]> {
    return Promise.resolve(this.preBookOrders);
  }
 
 
 //TryString--------------------------------------------
 storeTryString(tryString: String){
    this.tryString=tryString;
  }
  getTryString(): Promise<String> {
    return Promise.resolve(this.tryString);
  }

  //CheckOrders--------------------------------------------
  storeCheckOrders(checkOrders: Order[]){
    this.checkOrders=checkOrders;
  }
  getCheckOrders(): Promise<Order[]> {
    return Promise.resolve(this.checkOrders);
  }


  //CheckOrder--------------------------------------------
  storeCheckOrder(checkOrder: Order){
    this.checkOrder=checkOrder;
  }
  getCheckOrder(): Promise<Order> {
    return Promise.resolve(this.checkOrder);
  }
}