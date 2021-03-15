require("dotenv").config();
const fetch = require("node-fetch");
const telegram = require("node-telegram-bot-api");
const bot = new telegram(process.env.TELEGRAM_TOKEN);

const weather_token = process.env.WEATHER_API_TOKEN;

const weather_url = new URL("https://api.openweathermap.org/data/2.5/weather");

weather_url.searchParams.set("APPID", weather_token);
weather_url.searchParams.set("q", "cyberjaya");
weather_url.searchParams.set("units", "metric");

const getWeatherData = async () => {
  const res = await fetch(weather_url.toString());
  const body = await res.json();
  return body;
};

const generateWeatherMessage = (data) =>
  `The current weather in ${data.name}: ${data.weather[0].description}.\nCurrent temperature: ${data.main.temp}\nMinimum temperature: ${data.main.temp_min}\nMaximum temperature: ${data.main.temp_max}`;

const main = async () => {
  const weather_data = await getWeatherData();
  const weather_string = generateWeatherMessage(weather_data);
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weather_string);
};

main();
