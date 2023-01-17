# Project Birdnest
Frontend can be found [here](https://github.com/kivistoilkka/project-birdnest-frontend). 

## Commands
Run backend through Forever-Monitor:
```bash
npm start
```
Run backend normally:
```bash
npm run start:without-fm
```
Run tests:
```bash
npm run test
```
Build frontend and copy it to the backend folder (installed frontend has to be located in the sibling directory):
```bash
npm run build:ui
```
Rest of the commands can be found from package.json.

## Configuration
File /utils/config.js has default values for environmental variables, which can be changed with .env file.
