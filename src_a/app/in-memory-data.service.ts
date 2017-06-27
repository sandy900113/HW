import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let DataOfOrders = [
          {id: 1,
          movie_id: 1,
          time_id: 1,
          seat_number: 31, 

          name:"ABC",
          phone:"123456",
          email:"abc@zxc"
          },
          {id: 2,
          movie_id: 4,
          time_id: 5,
          seat_number: 25, 

          name:"ABC",
          phone:"65431",
          email:"abc@zxc"
          },
          {id: 3,
          movie_id: 1,
          time_id: 5,
          seat_number: 24, 

          name:"ABC",
          phone:"65431",
          email:"abc@zxc"
          },
        ];
        return {DataOfOrders};
  }
}