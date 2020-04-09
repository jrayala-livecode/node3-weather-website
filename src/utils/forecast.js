const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = "https://api.darksky.net/forecast/819a5c2be63074b649c2f1e95a0a313f/"+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"?units=si&lang=es";
    request(
        {
            url: url,
            json: true,
        },
        (error,{body}) => {
            if(error){
                callback('Imposible conectar al servicio de clima',undefined);
            }else if(body.error){
                callback('Imposible encontrar locación: '+body.error,undefined);  
            }else{
                callback(undefined,body.currently.summary + '. Actualmente hay ' + body.currently.temperature + '° grados afuera. Hay una probabilidad de '+body.currently.precipProbability+'% de posibilidad de lluvia.');
            }
        }
    )
}

module.exports = forecast;