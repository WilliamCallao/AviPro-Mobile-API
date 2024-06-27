# AviPro Mobile API

AviPro Mobile API is the dedicated backend for the AviPro mobile application, implemented with Express and Docker. This API is part of an integrated solution that facilitates the synchronization and management of data between the desktop and mobile versions of AviPro.

## Project Description

AviPro Mobile is an extension of Avi Pro+, a desktop system used for accounting and management of poultry companies. The mobile application is designed to digitize the management of outstanding invoice collections from clients, providing an efficient tool that is connected with its desktop version.

![mav](https://github.com/WilliamCallao/AviPro-Mobile-API/assets/96638909/6c47587d-a913-4d9a-8756-9eb92ab2c0f9)

## Project Repositories

This project is divided into three repositories:

1. AviPro-Mobile-APP: Mobile application.
2. AviPro-Mobile-API: Dedicated backend, implemented with Express and Docker.
3. AviPro-Dashboard: Web dashboard project for managing licenses and synchronization between the desktop and mobile systems.

Note: The Dashboard does not refer to the desktop version of AviPro. It is a web application intended for managing the backend.

## Project Structure

The project structure is designed to facilitate the daily synchronization between the desktop version and the mobile version of AviPro. Each day, at a defined time, the information from the companies using the AviPro+ desktop version is synchronized with the database used by the mobile application. Throughout the day, the mobile application uses the data from the designated mobile database. At the end of the day, the manager handling the desktop program decides to import the information from the mobile application's database, performs management tasks, and reloads data into the desktop-designated database.

## Usage

### Prerequisites

- Docker (https://www.docker.com/get-started)
- Node.js (https://nodejs.org/) (optional, for local development)

### Installation and Configuration

1. Clone the repository:

   ```sh
   git clone https://github.com/WilliamCallao/AviPro-Mobile-API.git
   cd AviPro-Mobile-API
   ```

2. Configure environment variables:

   Create a `.env` file in the root of the project with the following variables:

   ```env
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=your_host
   DB_PORT=your_port
   ```

3. Start the application with Docker:

   ```sh
   docker-compose up --build
   ```

4. Access the API:

   The API will be available at http://localhost:3000.

### Main Routes

- Clients:
  - `GET /api/mobile/clientes/empresa/:empresa_id`
  - `GET /api/mobile/clientes/:empresa_id/:cuenta`
  
- Pending Notes:
  - `GET /api/mobile/notas-pendientes/empresa/:empresa_id`
  - `POST /api/mobile/notas-pendientes`

- Collectors:
  - `GET /api/mobile/cobradores/empresa/:empresa_id`
  - `POST /api/mobile/cobradores`

- Deposit Accounts:
  - `GET /api/mobile/cuentas-deposito/empresa/:empresa_id`
  - `POST /api/mobile/cuentas-deposito`

- Payment History:
  - `GET /api/mobile/historial-cobros/empresa/:empresa_id/cobrador/:cobrador_id`
  - `POST /api/mobile/historial-cobros`

- Payment Rollback:
  - `POST /api/mobile/notas-cobradas/rollback`
  - `POST /api/mobile/notas-pendientes/rollback`
