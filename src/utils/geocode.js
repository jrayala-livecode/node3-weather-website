const request = require ('request');

const find_coordinates = (address, callback) => {
    const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoiam9hcXVpbi1heWFsYWMiLCJhIjoiY2s0anYwaXQ5MDVrbDNqbXI5YXFkeHdyYiJ9.AuLNWhAIiurSM4nHaaYeCg&limit=1'
    request({ url : locationURL,json: true },(error,{body}) => {
            if(error){
                callback("No se pudo encontrar la URL de coordenadas", undefined);
            }else if(body.features.length === 0){
                callback("No se puede encontrar la locación.", undefined)
            }else{
                const {features} = body
                const latitude = features[0].center[1];
                const longitude = features[0].center[0];
                const location = features[0].place_name;
                callback(undefined,{
                    location : location,
                    latitude : latitude,
                    longitude : longitude
                });
            }
        }
    )
}

module.exports = {
    find_coordinates
}