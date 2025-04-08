const status = document.getElementById("status");
const info = document.getElementById("info");
const ipAddress = document.getElementById("ask");

document.getElementById("find").addEventListener("click", () => {
  if (ipAddress.value) {
    fetch(`https://ipwho.is/${ipAddress.value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }
        return response.json();
      })
      .then(responseData => {
        if (responseData.success === false) {
          throw new Error(responseData.message || "IP invalide");
        }

        info.innerHTML = `
          <b>IP</b>: ${responseData.ip} <br>
          <b>Pays</b>: ${responseData.country} <br>
          <b>Région</b>: ${responseData.region} <br>
          <b>Ville</b>: ${responseData.city} <br>
          <b>Code postal</b>: ${responseData.postal} <br>
          <b>Latitude</b>: ${responseData.latitude} <br>
          <b>Longitude</b>: ${responseData.longitude} <br>
          <b>Fournisseur</b>: ${responseData.connection?.isp || "Inconnu"} <br>
        `;

        ipAddress.value = "";
        status.innerHTML = "";
      })
      .catch(error => {
        status.innerHTML = `Une erreur s'est produite: ${error.message}`;
      })
      .finally(() => {
        console.log("Opération terminée");
      });
  } else {
    status.innerHTML = "Aucune adresse IP saisie☘️...";
  }
});
