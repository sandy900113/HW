import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { DataOfMovie } from './data-of-movie';

@Injectable()
export class DataService {

  getMovies(): Promise<Movie[]> {
    return Promise.resolve(DataOfMovie);
  }
  getMovie(id: number): Promise<Movie> {
    return this.getMovies()
             .then(DataOfMovie => DataOfMovie.find(Movie => Movie.id === id));
  }

  // See the "Take it slow" appendix
  getHeroesSlowly(): Promise<Movie[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getMovies()), 2000);
    });
  }
}