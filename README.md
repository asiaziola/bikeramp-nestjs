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

- `start_address` - start address in format: "Plac Europejski 2, Warszawa, Polska"
- `destination_address` - destination address in format: "Plac Europejski 2, Warszawa, Polska"
- `price` - package price in PLN
- `date` - date of delivery

#### Stats

1. **GET** `api/stats/weekly`

Returns how many kilometers did the courier ride during current week and how much money he received for the rides.

2. **GET** `api/stats/monthly`
   Returns a summary of ride distances from current month, grouped by day.
