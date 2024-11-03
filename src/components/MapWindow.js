class MapWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.markers = [];
    
    this.shadowRoot.innerHTML = `
      <style>
        #map {
          width: 100%;
          height: 400px;
          margin-bottom: 20px;
          border-radius: 8px;
        }
      </style>
      <div id="map"></div>
    `;
  }

  async connectedCallback() {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => this.initMap());
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  }

  async initMap() {
    const map = new google.maps.Map(this.shadowRoot.getElementById('map'), {
      zoom: 6,
      center: { lat: 54.5, lng: -4 }, // Center of UK
    });

    try {
      const response = await fetch('./src/services/fetch_locations.php');
      const locations = await response.json();
      
      locations.forEach(async location => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: location.postcode }, (results, status) => {
          if (status === 'OK') {
            const marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: location.name
            });
            
            const infoWindow = new google.maps.InfoWindow({
              content: `<h3>${location.name}</h3><p>${location.address}</p>`
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            this.markers.push(marker);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }
}

customElements.define('map-window', MapWindow); 