function updateMap(map){
    fetch("/api/data")
    .then(response => response.json())
    .then(rsp => {
        console.log("Fetched data:", rsp); 
        rsp.data.forEach(element => {
            let latitude = element.latitude;
            let longitude = element.longitude;
            let cases = element.infected;
            let brightness = ((cases) / 12);
            if(brightness > 80) brightness = 80;
            if(brightness < 20) brightness = 20;
            brightness = 100 - brightness;
            let color = `hsl(0,80%,${brightness}%)`;
            // create a marker at a coordinate
            new mapboxgl.Marker({
                draggable: false,
                color: color
            })
            .setLngLat([longitude, latitude])
            .addTo(map);
    }) 
    })             
}