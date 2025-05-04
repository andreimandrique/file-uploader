# file-uploader
A file storage app using cloudinary to store files and Prisma ORM to manage sql.
## Installation
### 1. Clone the repository
Get a copy of the repo
### 2. Install dependencies
In the root directory
```
npm install
```
### 3.Set up environment variables: 
Create .env file in the root directory and add the following 
```
DATABASE_URL="postgresql://<db role>:<db password>@<db host>/<db name>?sslmode=require"
TEST_DATABASE_URL ="postgresql://<db role>:<db password>@<db host>/<db name>?sslmode=disable"
CLOUDINARY_API_KEY="<your cloudinary api key>"
CLOUDINARY_API_SECRET="<your cloudinary api secret>"
SESSIONSECRET="<your session secret>"
```
### 4. Generate Prisma client
In the root folder run
```
npx prisma generate

```

### 5. Start the server
In development
```
npm run dev
```
In production
```
npm run start
```
### 6. Access the application
Open your browser and navigate to http://localhost:3000
## Features
### Basic Features
* Log in 
* Sign up
* Log out
### File Features
* Add File
* Delete File
* Dowload File
