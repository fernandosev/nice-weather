<h1 align="center">Nice Weather</h1>

## Content Table

- [About this project](#-about-this-project)
- [Layout](#-layout)
- [Running the project](#running-the-project)
- [Running the tests](#running-the-tests)
- [Author](#-author)

## 📄 About this project

React Native App to show the weather of user location

## 🎨 Layout

Designed with Figma, available in:

- [Nice Weather](https://www.figma.com/file/8vfwHH51457eFWXEP3arMW/Nice-Weather?node-id=0%3A1).

#### Nice Weather

<img src="https://raw.githubusercontent.com/fernandosev/nice-weather/main/readme_images/niceWeather.gif" width="250">

#### Screens

<img src="https://raw.githubusercontent.com/fernandosev/nice-weather/main/readme_images/initial%20screens.png" width="600">

#### Home - day

<img src="https://raw.githubusercontent.com/fernandosev/nice-weather/main/readme_images/weather%20screens.png" width="600">

#### Home - night

<img src="https://raw.githubusercontent.com/fernandosev/nice-weather/main/readme_images/night%20weather%20screens.png" width="600">

## Running the project

```bash
# 1. Clone thie repo
git clone https://github.com/fernandosev/nice-weather.git

# 2. Access the project folder
cd nice-weather

# 3. Install the dependencies
yarn # or $ npm install

# 4. Install Pod for ios
npx pod-install

# 5. Create a .env file on root project folder

# 6. Add the following environment variables
# API_BASE_URL='https://api.openweathermap.org/data/2.5'
# API_KEY_URL='' Note: You need to create a account in Open Weather Map to create a API_KEY_URL

# 7. Run the application on android
yarn android

# 8. Run the application on iOS
yarn ios

```

## Running the tests

```bash
yarn test

```

## 👨‍💻 Author

- [Fernando Severino Almeida](https://github.com/fernandosev)
