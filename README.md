# <img width="325" src=".github/logo.png"> <br />

## Installation
1. Install [node.js](https://nodejs.org/en/download)
2. Download the code / clone the repository
3. Install dependencies & configure the program `npm install`
4. Run it with `npm start` or send a test webhook with `npm test`

## Configuration
Basic configuration can be done via `npm config` which also runs after step 3

For a more sophisticated experience, simply edit the .env file directly <br />
Special fields such as `{number}`, `{valid}`, `{generated}` and `{name}` will be replaced with their corresponding values (the number is valid a day after generation).

### Mapping names to numbers
The `{name}` field will be replaced with the corresponding text for the number, defined in names.txt
