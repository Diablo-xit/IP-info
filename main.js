const status = document.getElementById("status");
const info = document.getElementById("info");


const ipAddress =document.getElementById("ask");

document.getElementById("find").addEventListener("click",()=>{ 
  if (ipAddress.value) {
  fetch(`http://ip-api.com/json/${ipAddress.value}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur de réseau");
      }
      return response.json();
    })
    .then(responseData => {
      
      info.innerHTML = `
        <b>IP</b>: ${responseData.query} <br>
        <b>Pays  </b>: ${responseData.country} <br>
          <b>Région  </b>: ${responseData.regionName} <br>
          <b>Ville  </b>: ${responseData.city} <br>
          <b>Code postal  </b>: ${responseData.zip} <br>
         <b> Latitude  </b>: ${responseData.lat} <br>
         <b> Longitude  </b>: ${responseData.lon} <br>
          <b>Fournisseur  </b>: ${responseData.isp} <br>
      `;
      ipAddress.value="";
      
    
      
    })
    
    .catch(error => {
      status.innerHTML = `Une erreur s'est produite: ${error}`;
    })
    .finally(() => {
      console.log("Opération terminée");
    });
} else {
  status.innerHTML = "Aucune adresse IP saisie☘️...";
}
})
