const temperature = async (user, params) => {
    const { location, operator, temperature, unit } = params;

    if (!location || !operator || !temperature || !unit) {
        return false;
    }

    const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPEN_WEATHER_API_KEY}`
    ).then((res) => res.json());

    const weatherTemperature =
        unit === "celsius"
            ? weather.main.temp - 273.15
            : weather.main.temp * 1.8 - 459.67;

    switch (operator) {
        case "equal":
            return weatherTemperature === temperature;
        case "greater_than":
            return weatherTemperature > temperature;
        case "less_than":
            return weatherTemperature < temperature;
        case "greater_than_or_equal":
            return weatherTemperature >= temperature;
        case "less_than_or_equal":
            return weatherTemperature <= temperature;
        default:
            return false;
    }
};
