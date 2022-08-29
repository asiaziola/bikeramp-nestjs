# Bikeramp

Bikeramp is a tracking system for bike couriers. Deployed version is available under [https://bikeramp-nestjs.herokuapp.com](https://bikeramp-nestjs.herokuapp.com/).

### Run development server

In order to run server locally, you need to follow these steps:

1. Create `env/development.env` file in [config](https://github.com/asiaziola/bikeramp-nestjs/tree/main/config) directory and set there following environment variables:

```sh
DATABASE_URL=postgres://user:password@host:port/db_name
GOOGLE_MAPS_ACCESS_KEY=YOUR_ACCESS_KEY
PORT=5000
```

2. Run:

```sh
npm run start:dev
```

### Routes

#### Trips

1. **POST** `/api/trips`

Logs the trip and automatically calculates the distance between start and destination addresses.

Parameters:

- `start_address` - start address, e.g.: "Plac Europejski 2, Warszawa, Polska"
- `destination_address` - destination address, e.g.: "Plac Europejski 2, Warszawa, Polska"
- `price` - package price, e.g.: 22.50
- `date` - date of delivery, e.g. "2022-08-27"

2. **GET** `/api/trips`

Returns all tracked trips ordered by date.

#### Stats

1. **GET** `api/stats/weekly`

Returns how many kilometers did the courier ride during current week and how much money he received for the rides.

2. **GET** `api/stats/monthly`
   Returns a summary of ride distances from current month, grouped by day.
