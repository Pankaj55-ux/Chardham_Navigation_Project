// Graph data structure
const V = 10; // Total number of locations
const INT_MAX = 999999;

// Location coordinates (latitude, longitude)
const locations = {
    "Yamunotri": { lat: 31.0140, lng: 78.4600 },
    "Gangotri": { lat: 30.9944, lng: 78.9400 },
    "Kedarnath": { lat: 30.7346, lng: 79.0669 },
    "Badrinath": { lat: 30.7448, lng: 79.4937 },
    "Uttarkashi": { lat: 30.7298, lng: 78.4435 },
    "Guptkashi": { lat: 30.5333, lng: 79.0667 },
    "Haridwar": { lat: 29.9457, lng: 78.1642 },
    "Rishikesh": { lat: 30.0869, lng: 78.2676 },
    "Dehradun": { lat: 30.3165, lng: 78.0322 },
    "Rudraprayag": { lat: 30.2847, lng: 78.9833 }
};

// Distance matrix (in kilometers)
const graph = [
    [0, 150, INT_MAX, INT_MAX, 90, INT_MAX, 220, INT_MAX, INT_MAX, INT_MAX],     // Yamunotri
    [150, 0, INT_MAX, 240, 100, INT_MAX, 250, INT_MAX, INT_MAX, INT_MAX],        // Gangotri
    [INT_MAX, INT_MAX, 0, 200, INT_MAX, 80, INT_MAX, INT_MAX, INT_MAX, 30],      // Kedarnath
    [INT_MAX, 240, 200, 0, INT_MAX, INT_MAX, INT_MAX, INT_MAX, INT_MAX, 100],    // Badrinath
    [90, 100, INT_MAX, INT_MAX, 0, INT_MAX, 180, 160, 170, INT_MAX],             // Uttarkashi
    [INT_MAX, INT_MAX, 80, INT_MAX, INT_MAX, 0, INT_MAX, INT_MAX, INT_MAX, 50],  // Guptkashi
    [220, 250, INT_MAX, INT_MAX, 180, INT_MAX, 0, 30, 60, INT_MAX],              // Haridwar
    [INT_MAX, INT_MAX, INT_MAX, INT_MAX, 160, INT_MAX, 30, 0, 50, INT_MAX],      // Rishikesh
    [INT_MAX, INT_MAX, INT_MAX, INT_MAX, 170, INT_MAX, 60, 50, 0, INT_MAX],      // Dehradun
    [INT_MAX, INT_MAX, 30, 100, INT_MAX, 50, INT_MAX, INT_MAX, INT_MAX, 0]       // Rudraprayag
];

// Location names
const places = [
    "Yamunotri", "Gangotri", "Kedarnath", "Badrinath", "Uttarkashi",
    "Guptkashi", "Haridwar", "Rishikesh", "Dehradun", "Rudraprayag"
];

// Global variables for map
let map;
let markers = [];
let currentRouteLayer;

// Helicopter services data
const helicopterServices = {
    "Kedarnath": {
        "Phata": {
            price: 7500,
            duration: "15 minutes",
            operator: "Pawan Hans",
            contact: "1800-180-1234",
            website: "https://www.pawanhans.co.in",
            schedule: "6:00 AM to 4:00 PM",
            capacity: "6 passengers",
            booking: "https://www.heliyatra.irctc.co.in"
        },
        "Guptkashi": {
            price: 8500,
            duration: "20 minutes",
            operator: "Heli Services",
            contact: "1800-180-5678",
            website: "https://www.heliservices.in",
            schedule: "6:30 AM to 3:30 PM",
            capacity: "6 passengers",
            booking: "https://www.heliyatra.irctc.co.in"
        },
        "Sersi": {
            price: 8000,
            duration: "18 minutes",
            operator: "Uttarakhand Heli",
            contact: "1800-180-9012",
            website: "https://www.uttarakhandheli.com",
            schedule: "7:00 AM to 3:00 PM",
            capacity: "6 passengers",
            booking: "https://www.heliyatra.irctc.co.in"
        }
    },
    "Badrinath": {
        "Joshimath": {
            price: 12000,
            duration: "25 minutes",
            operator: "Pawan Hans",
            contact: "1800-180-1234",
            website: "https://www.pawanhans.co.in",
            schedule: "7:00 AM to 4:00 PM",
            capacity: "6 passengers",
            booking: "https://www.heliyatra.irctc.co.in"
        },
        "Govindghat": {
            price: 11000,
            duration: "22 minutes",
            operator: "Heli Services",
            contact: "1800-180-5678",
            website: "https://www.heliservices.in",
            schedule: "7:30 AM to 3:30 PM",
            capacity: "6 passengers",
            booking: "https://www.heliyatra.irctc.co.in"
        }
    },
    "Gangotri": {
        "Harsil": {
            price: 9500,
            duration: "20 minutes",
            operator: "Uttarakhand Heli",
            contact: "1800-180-9012",
            website: "https://www.uttarakhandheli.com",
            schedule: "7:00 AM to 3:00 PM",
            capacity: "6 passengers",
            booking: "https://www.heliyatra.irctc.co.in"
        }
    },
    "Yamunotri": {
        "Kharsali": {
            price: 9000,
            duration: "18 minutes",
            operator: "Pawan Hans",
            contact: "1800-180-1234",
            website: "https://www.pawanhans.co.in",
            schedule: "7:00 AM to 3:00 PM",
            capacity: "6 passengers",
            booking: "https://www.heliyatra.irctc.co.in"
        }
    }
};

// Transport agencies data
const transportAgencies = {
    "Dada Boudir Tour & Travels": {
        info: {
            contact: "9917033448, 9319023448",
            email: "dadaboudirtravels@gmail.com, ankitrana80@yahoo.co.in",
            website: "https://dadaboudir.com",
            rating: 4.5,
            reviews: 1250,
            packages: [
                {
                    name: "Chardham Yatra Fix Departure Group Tour",
                    price: 32000,
                    duration: "15 Nights / 16 Days",
                    itinerary: "Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Sitapur → Kedarnath → Badrinath → Haridwar",
                    link: "https://dadaboudir.com/tours/chardham-yatra-fix-departure-group-tour-2/"
                },
                {
                    name: "Badrinath Dham Yatra Budget Package",
                    price: 12500,
                    duration: "4 Days / 3 Nights",
                    itinerary: "Haridwar → Joshimath → Badrinath → Haridwar",
                    link: "https://dadaboudir.com/tours/badrinath-dham-yatra-budget-package/"
                },
                {
                    name: "Do Dham Yatra Fix Departure",
                    price: 18500,
                    duration: "6 Days / 5 Nights",
                    itinerary: "Haridwar → Kedarnath → Badrinath → Haridwar",
                    link: "https://dadaboudir.com/tours/do-dham-dham-yatra-fix-departure/"
                },
                {
                    name: "Haridwar Weekend Tour",
                    price: 4500,
                    duration: "3 Days / 2 Nights",
                    itinerary: "Delhi → Haridwar → Rishikesh → Delhi",
                    link: "https://dadaboudir.com/tours/haridwar-weekend-tour-itinerary/"
                },
                {
                    name: "Badrinath Auli Tour Package",
                    price: 15500,
                    duration: "5 Days / 4 Nights",
                    itinerary: "Delhi → Haridwar → Joshimath → Auli → Badrinath → Haridwar → Delhi",
                    link: "https://dadaboudir.com/tours/badrinath-auli-tour-package/"
                },
                {
                    name: "Kedarnath Yatra by Helicopter",
                    price: 25000,
                    duration: "2 Days / 1 Night",
                    itinerary: "Delhi → Dehradun → Kedarnath → Dehradun → Delhi",
                    link: "https://dadaboudir.com/tours/kedarnath-yatra-by-helicopter/"
                }
            ]
        }
    },
    "Chardham Tour": {
        info: {
            contact: "1800-123-4567",
            email: "info@chardhamtour.in",
            website: "https://www.chardhamtour.in",
            rating: 4.3,
            reviews: 850,
            packages: [
                {
                    name: "Chardham Yatra by Helicopter",
                    price: 125000,
                    duration: "6 Days / 5 Nights",
                    itinerary: "Delhi → Dehradun → Yamunotri → Gangotri → Kedarnath → Badrinath → Delhi",
                    link: "https://www.chardhamtour.in/chardham-yatra-by-helicopter.html"
                },
                {
                    name: "Chardham Yatra from Delhi",
                    price: 28500,
                    duration: "12 Days / 11 Nights",
                    itinerary: "Delhi → Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Kedarnath → Badrinath → Delhi",
                    link: "https://www.chardhamtour.in/chardham-yatra-from-delhi.html"
                },
                {
                    name: "Chardham Yatra from Haridwar",
                    price: 25500,
                    duration: "11 Days / 10 Nights",
                    itinerary: "Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Kedarnath → Badrinath → Haridwar",
                    link: "https://www.chardhamtour.in/chardham-yatra-from-haridwar.html"
                },
                {
                    name: "Badrinath Kedarnath Yatra by Helicopter",
                    price: 45000,
                    duration: "4 Days / 3 Nights",
                    itinerary: "Delhi → Dehradun → Kedarnath → Badrinath → Delhi",
                    link: "https://www.chardhamtour.in/badrinath-kedarnath-yatra-by-helicopter.html"
                },
                {
                    name: "Chardham Yatra Group Tour",
                    price: 30000,
                    duration: "12 Days / 11 Nights",
                    itinerary: "Delhi → Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Kedarnath → Badrinath → Delhi",
                    link: "https://www.chardhamtour.in/chardham-yatra-group-tour.html"
                },
                {
                    name: "Gangotri Gaumukh Trek",
                    price: 15000,
                    duration: "7 Days / 6 Nights",
                    itinerary: "Delhi → Haridwar → Uttarkashi → Gangotri → Gaumukh → Gangotri → Haridwar → Delhi",
                    link: "https://www.chardhamtour.in/gangotri-gaumukh-trek.html"
                }
            ]
        }
    },
    "Mahalaxmi Travel": {
        info: {
            contact: "1800-987-6543",
            email: "info@mahalaxmitravels.com",
            website: "https://mahalaxmitravels.com",
            rating: 4.7,
            reviews: 1500,
            packages: [
                {
                    name: "Ek Dham Yatra from Haridwar",
                    price: 12000,
                    duration: "4 Days / 3 Nights",
                    itinerary: "Haridwar → Kedarnath/Badrinath → Haridwar",
                    link: "https://mahalaxmitravels.com/ek-dham-yatra.php"
                },
                {
                    name: "Do Dham Yatra from Haridwar",
                    price: 18500,
                    duration: "6 Days / 5 Nights",
                    itinerary: "Haridwar → Kedarnath → Badrinath → Haridwar",
                    link: "https://mahalaxmitravels.com/do-dham-yatra.php"
                },
                {
                    name: "Teen Dham Yatra from Haridwar",
                    price: 25000,
                    duration: "8 Days / 7 Nights",
                    itinerary: "Haridwar → Gangotri → Kedarnath → Badrinath → Haridwar",
                    link: "https://mahalaxmitravels.com/teen-dham-yatra.php"
                },
                {
                    name: "Char Dham Yatra from Haridwar",
                    price: 35000,
                    duration: "12 Days / 11 Nights",
                    itinerary: "Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Kedarnath → Badrinath → Haridwar",
                    link: "https://mahalaxmitravels.com/fixed-departure-from-haridwar.php"
                },
                {
                    name: "Char Dham Yatra from Delhi",
                    price: 38500,
                    duration: "13 Days / 12 Nights",
                    itinerary: "Delhi → Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Kedarnath → Badrinath → Delhi",
                    link: "https://mahalaxmitravels.com/char-dham-yatra-from-delhi.php"
                }
            ]
        }
    },
    "Discover Uttarakhand": {
        info: {
            contact: "1800-111-2222",
            email: "info@discover-uttarakhand.com",
            website: "https://discover-uttarakhand.com",
            rating: 4.6,
            reviews: 950,
            packages: [
                {
                    name: "Chardham Yatra Package 2025",
                    price: 33500,
                    duration: "12 Days / 11 Nights",
                    itinerary: "Delhi → Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Kedarnath → Badrinath → Delhi",
                    link: "https://discover-uttarakhand.com/chardham-yatra-package-2024.php"
                }
            ]
        }
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize map
        initMap();

        // Initialize helicopter services
        initHelicopterServices();

        // Initialize transport choice
        initTransportChoice();

        // Populate location dropdowns
        const startLocation = document.getElementById('startLocation');
        const endLocation = document.getElementById('endLocation');

        if (startLocation && endLocation) {
            // Clear existing options
            startLocation.innerHTML = '<option value="-1">Select Starting Point</option>';
            endLocation.innerHTML = '<option value="-1">Select Ending Point</option>';

            // Add options for each place
            places.forEach((place, index) => {
                startLocation.innerHTML += `<option value="${index}">${place}</option>`;
                endLocation.innerHTML += `<option value="${index}">${place}</option>`;
            });
        }

        // Add event listeners for buttons
        const findRouteBtn = document.getElementById('findRoute');
        const showAllRoutesBtn = document.getElementById('showAllRoutes');
        const showLocationsBtn = document.getElementById('showLocations');

        if (findRouteBtn) {
            findRouteBtn.addEventListener('click', findRoute);
        }
        if (showAllRoutesBtn) {
            showAllRoutesBtn.addEventListener('click', showAllRoutes);
        }
        if (showLocationsBtn) {
            showLocationsBtn.addEventListener('click', showLocations);
        }

        // Add event listener for travel mode changes
        const travelModeInputs = document.querySelectorAll('input[name="travelMode"]');
        travelModeInputs.forEach(input => {
            input.addEventListener('change', function() {
                const helicopterInfo = document.getElementById('helicopterInfo');
                const findRouteBtn = document.getElementById('findRoute');
                
                if (helicopterInfo) {
                    helicopterInfo.style.display = this.value === 'helicopter' ? 'block' : 'none';
                }
                
                if (findRouteBtn) {
                    findRouteBtn.disabled = this.value === 'helicopter';
                }
            });
        });

        // Initialize Bootstrap tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        console.log('Event listeners initialized successfully');
    } catch (error) {
        console.error('Error initializing event listeners:', error);
    }
});

// Initialize map
function initMap() {
    try {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
            console.error('Map container not found');
            return;
        }

        // Initialize map with center at Uttarakhand
        map = L.map('map').setView([30.0668, 79.0193], 7);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Clear existing markers
        if (markers) {
            markers.forEach(marker => map.removeLayer(marker));
        }
        markers = [];

        // Add markers for all places
        places.forEach(place => {
            const marker = L.marker([locations[place].lat, locations[place].lng])
                .addTo(map)
                .bindPopup(place);
            markers.push(marker);
        });

        // Fit map to show all markers
        if (markers.length > 0) {
            const group = new L.featureGroup(markers);
            map.fitBounds(group.getBounds().pad(0.1));
        }

        // Force a resize event to ensure proper rendering
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

// Find route between selected locations
function findRoute() {
    try {
        // Check if map is initialized
        if (!map) {
            console.error('Map not initialized');
            return;
        }

        const startIndex = parseInt(document.getElementById('startLocation').value);
        const endIndex = parseInt(document.getElementById('endLocation').value);
        const travelMode = document.querySelector('input[name="travelMode"]:checked').value;

        if (startIndex === endIndex) {
            alert('Please select different locations for start and end points');
            return;
        }

        if (startIndex === -1 || endIndex === -1) {
            alert('Please select both starting and ending locations');
            return;
        }

        // Clear previous routes
        if (currentRouteLayer && map) {
            map.removeLayer(currentRouteLayer);
        }

        // Show loading state
        const routeResult = document.getElementById('routeResult');
        if (routeResult) {
            routeResult.innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border text-primary mb-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <h5>Calculating route...</h5>
                </div>
            `;
        }

        // Use Dijkstra's algorithm to find the shortest path
        const result = dijkstra(graph, startIndex, endIndex);
        
        if (result.distance === INT_MAX) {
            if (routeResult) {
                routeResult.innerHTML = `
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        No valid route found between these locations.
                    </div>
                `;
            }
            return;
        }

        const path = result.path;
        const distance = result.distance;

        // Create route with intermediate points
        const coordinates = path.map(index => [
            locations[places[index]].lng,
            locations[places[index]].lat
        ]);
        
        const route = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: coordinates
            }
        };

        const duration = calculateDuration(distance, travelMode);

        // Create route layer
        currentRouteLayer = L.geoJSON(route, {
            style: {
                color: getRouteColor(travelMode),
                weight: 5,
                opacity: 0.7
            }
        }).addTo(map);

        // Add markers for all points in the path
        path.forEach(index => {
            const point = [locations[places[index]].lat, locations[places[index]].lng];
            L.marker(point).addTo(map).bindPopup(places[index]);
        });

        // Fit map to route
        map.fitBounds(currentRouteLayer.getBounds(), { padding: [50, 50] });

        // Update route info
        if (routeResult) {
            const routeDescription = path.map(index => places[index]).join(' → ');
            routeResult.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">
                            <i class="fas fa-route me-2"></i>Route Information
                        </h5>
                        <div class="mb-3">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-map-marked-alt me-2 text-primary"></i>
                                <strong>Route:</strong> ${routeDescription}
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-car me-2 text-primary"></i>
                                <strong>Mode:</strong> ${travelMode.charAt(0).toUpperCase() + travelMode.slice(1)}
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-road me-2 text-primary"></i>
                                <strong>Distance:</strong> ${distance.toFixed(1)} km
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-clock me-2 text-primary"></i>
                                <strong>Duration:</strong> ${formatDuration(duration)}
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-info-circle me-2 text-primary"></i>
                                <strong>Route Type:</strong> ${getRouteType(travelMode)}
                            </div>
                        </div>
                        <div class="alert alert-info">
                            <small>
                                <i class="fas fa-info-circle"></i> 
                                This route is based on the road network. Actual travel time may vary based on road conditions and traffic.
                            </small>
                        </div>
                    </div>
                </div>
            `;
        }

        // Force a resize event to ensure proper rendering
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        console.log('Route found successfully');
    } catch (error) {
        console.error('Error finding route:', error);
        const routeResult = document.getElementById('routeResult');
        if (routeResult) {
            routeResult.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    An error occurred while finding the route. Please try again.
                </div>
            `;
        }
    }
}

// Dijkstra's algorithm for finding shortest path
function dijkstra(graph, start, end) {
    const V = graph.length;
    const dist = new Array(V).fill(INT_MAX);
    const visited = new Array(V).fill(false);
    const parent = new Array(V).fill(-1);
    
    dist[start] = 0;
    
    for (let count = 0; count < V - 1; count++) {
        let u = -1;
        let minDist = INT_MAX;
        
        // Find vertex with minimum distance value
        for (let v = 0; v < V; v++) {
            if (!visited[v] && dist[v] < minDist) {
                minDist = dist[v];
                u = v;
            }
        }
        
        if (u === -1) break;
        
        visited[u] = true;
        
        // Update distance values of adjacent vertices
        for (let v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] !== INT_MAX && 
                dist[u] !== INT_MAX && dist[u] + graph[u][v] < dist[v]) {
                parent[v] = u;
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    // Reconstruct path
    const path = [];
    let current = end;
    while (current !== -1) {
        path.unshift(current);
        current = parent[current];
    }
    
    return {
        distance: dist[end],
        path: path
    };
}

// Show all routes between places
function showAllRoutes() {
    if (!map) {
        alert('Map is not initialized. Please wait a moment and try again.');
        return;
    }

    // Clear previous routes
    if (currentRouteLayer && map) {
        map.removeLayer(currentRouteLayer);
        currentRouteLayer = null;
    }

    // Show loading state
    const routeResult = document.getElementById('routeResult');
    routeResult.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Calculating all possible routes...</p>
        </div>
    `;

    try {
        // Create HTML table
        let tableHtml = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title mb-4">
                        <i class="fas fa-table me-2"></i>Shortest Routes Matrix
                    </h5>
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>From/To</th>
                                    ${places.map(place => `<th>${place}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
        `;

        // Calculate shortest routes between all pairs
        for (let i = 0; i < places.length; i++) {
            tableHtml += `<tr><th>${places[i]}</th>`;
            for (let j = 0; j < places.length; j++) {
                if (i === j) {
                    tableHtml += `<td class="table-secondary">-</td>`;
                } else {
                    // Find shortest path using Dijkstra's algorithm
                    const result = dijkstra(graph, i, j);
                    const distance = result.distance;
                    const path = result.path;

                    if (distance === INT_MAX) {
                        tableHtml += `<td class="table-danger">No Route</td>`;
                    } else {
                        const duration = calculateDuration(distance, 'driving');
                        const routeDescription = path.map(index => places[index]).join(' → ');
                        
                        tableHtml += `
                            <td>
                                <div class="d-flex flex-column">
                                    <span class="text-primary">
                                        <i class="fas fa-road"></i>
                                        ${distance.toFixed(1)} km
                                    </span>
                                    <span class="text-success">
                                        <i class="fas fa-clock"></i>
                                        ${formatDuration(duration)}
                                    </span>
                                    <button class="btn btn-sm btn-outline-info mt-1" 
                                            data-bs-toggle="tooltip" 
                                            data-bs-placement="top" 
                                            title="${routeDescription}">
                                        <i class="fas fa-route"></i> View Route
                                    </button>
                                </div>
                            </td>
                        `;
                    }
                }
            }
            tableHtml += `</tr>`;
        }

        tableHtml += `
                            </tbody>
                        </table>
                    </div>
                    <div class="alert alert-info mt-3">
                        <i class="fas fa-info-circle me-2"></i>
                        <strong>Note:</strong> This matrix shows the shortest possible routes between all locations.
                        Travel times are estimated based on an average speed of 50 km/h on mountain roads.
                        Click "View Route" to see the complete path between locations.
                    </div>
                </div>
            </div>
        `;

        routeResult.innerHTML = tableHtml;

        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Add markers for all places on the map
        if (markers) {
            markers.forEach(marker => {
                if (marker && map) {
                    map.removeLayer(marker);
                }
            });
        }
        markers = [];

        places.forEach(place => {
            const marker = L.marker([locations[place].lat, locations[place].lng])
                .bindPopup(place)
                .addTo(map);
            markers.push(marker);
        });

        // Fit map to show all markers
        if (markers.length > 0) {
            const group = new L.featureGroup(markers);
            map.fitBounds(group.getBounds().pad(0.1));
        }

    } catch (error) {
        console.error('Error showing all routes:', error);
        routeResult.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-circle"></i>
                Error calculating routes. Please try again.
            </div>
        `;
    }
}

// Show all locations on the map
function showLocations() {
    try {
        // Check if map is initialized
        if (!map) {
            console.error('Map not initialized');
            return;
        }

        // Clear previous routes
        if (currentRouteLayer && map) {
            map.removeLayer(currentRouteLayer);
        }

        // Clear existing markers
        if (markers) {
            markers.forEach(marker => {
                if (marker && map) {
                    map.removeLayer(marker);
                }
            });
        }
        markers = [];

        // Add markers for all places
        places.forEach(place => {
            const marker = L.marker([locations[place].lat, locations[place].lng])
                .bindPopup(place)
                .addTo(map);
            markers.push(marker);
        });

        // Fit map to show all markers
        if (markers.length > 0) {
            const group = new L.featureGroup(markers);
            map.fitBounds(group.getBounds().pad(0.1));
        }

        // Update route info in routeResult
        const routeResult = document.getElementById('routeResult');
        if (routeResult) {
            routeResult.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title mb-4">
                            <i class="fas fa-map-marker-alt text-primary me-2"></i>
                            All Locations
                        </h5>
                        <div class="row">
                            ${places.map(place => `
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h6 class="card-title text-primary mb-2">
                                                <i class="fas fa-mountain me-2"></i>
                                                ${place}
                                            </h6>
                                            <div class="d-flex align-items-center mb-2">
                                                <i class="fas fa-map-pin text-danger me-2"></i>
                                                <small class="text-muted">
                                                    ${locations[place].lat.toFixed(4)}, ${locations[place].lng.toFixed(4)}
                                                </small>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-info-circle text-info me-2"></i>
                                                <small class="text-muted">
                                                    Click on the marker on the map to view more details
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="alert alert-info mt-3">
                            <i class="fas fa-info-circle me-2"></i>
                            All locations are marked on the map. Click on any marker to view the location name.
                            You can use these locations to plan your route using the route planner above.
                        </div>
                    </div>
                </div>
            `;
        }

        // Force a resize event to ensure proper rendering
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        console.log('All locations shown successfully');
    } catch (error) {
        console.error('Error showing locations:', error);
        alert('An error occurred while showing locations. Please try again.');
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Initialize helicopter services
function initHelicopterServices() {
    const helicopterInfo = document.getElementById('helicopterInfo');
    if (!helicopterInfo) return;

    let content = '<h5 class="mb-3"><i class="fas fa-helicopter me-2"></i>Available Helicopter Services</h5>';
    
    Object.entries(helicopterServices).forEach(([destination, services]) => {
        content += `
            <div class="helicopter-destination mb-4">
                <h6 class="text-primary mb-2">
                    <i class="fas fa-mountain me-2"></i>${destination}
                </h6>
                <div class="helicopter-routes">
                    ${Object.entries(services).map(([from, service]) => `
                        <div class="helicopter-route">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <strong>${from} → ${destination}</strong>
                                    <div class="text-muted small">
                                        <i class="fas fa-clock me-1"></i>${service.duration}
                                        <span class="mx-2">|</span>
                                        <i class="fas fa-rupee-sign me-1"></i>${service.price.toLocaleString()}
                                    </div>
                                    <div class="text-muted small">
                                        <i class="fas fa-building me-1"></i>${service.operator}
                                        <span class="mx-2">|</span>
                                        <i class="fas fa-users me-1"></i>${service.capacity}
                                    </div>
                                    <div class="text-muted small">
                                        <i class="fas fa-calendar-alt me-1"></i>${service.schedule}
                                    </div>
                                </div>
                                <div class="text-end">
                                    <a href="${service.booking}" target="_blank" class="btn btn-sm btn-primary">
                                        <i class="fas fa-ticket-alt me-1"></i>Book Now
                                    </a>
                                    <div class="mt-1">
                                        <a href="tel:${service.contact}" class="text-decoration-none">
                                            <i class="fas fa-phone me-1"></i>${service.contact}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    content += `
        <div class="alert alert-info mt-3">
            <i class="fas fa-info-circle me-2"></i>
            <strong>Note:</strong> Helicopter services are subject to weather conditions and availability. 
            Advance booking is recommended. Prices are per person for one-way journey.
        </div>
    `;

    helicopterInfo.innerHTML = content;
}

// Initialize transport choice functionality
function initTransportChoice() {
    const startLocation = document.getElementById('startLocation');
    const endLocation = document.getElementById('endLocation');
    const transportAgency = document.getElementById('transportAgency');
    const transportAlert = document.getElementById('transportAlert');
    const transportAlertMessage = document.getElementById('transportAlertMessage');
    const transportChoice = document.getElementById('transportChoice');

    if (!transportAgency) {
        console.error('Transport agency select element not found');
        return;
    }

    // Populate transport agencies
    Object.keys(transportAgencies).forEach(agency => {
        const option = document.createElement('option');
        option.value = agency;
        option.textContent = agency;
        transportAgency.appendChild(option);
    });

    // Update transport options when locations change
    [startLocation, endLocation].forEach(select => {
        if (select) {
            select.addEventListener('change', updateTransportOptions);
        }
    });

    // Update agency info when agency changes
    if (transportAgency) {
        transportAgency.addEventListener('change', updateAgencyInfo);
    }

    // Initialize comparison table
    updateComparisonTable();
}

// Update transport options based on selected locations
function updateTransportOptions() {
    const startLocation = document.getElementById('startLocation');
    const endLocation = document.getElementById('endLocation');
    const transportAlert = document.getElementById('transportAlert');
    const transportAlertMessage = document.getElementById('transportAlertMessage');
    const transportChoice = document.getElementById('transportChoice');
    const transportAgency = document.getElementById('transportAgency');

    if (!startLocation || !endLocation || !transportAlert || !transportAlertMessage || !transportChoice || !transportAgency) {
        console.error('Required elements not found');
        return;
    }

    if (startLocation.value && endLocation.value) {
        transportAlert.style.display = 'none';
        // Enable transport agency selection
        transportAgency.disabled = false;
        
        // Automatically open transport choice section
        const bsCollapse = new bootstrap.Collapse(transportChoice, {
            toggle: true
        });
        
        // Update agency info
        updateAgencyInfo();
    } else {
        transportAlert.style.display = 'block';
        transportAlertMessage.textContent = 'Please select both starting point and destination to view transport options';
        // Disable transport agency selection
        transportAgency.disabled = true;
    }
}

// Update agency information based on selected agency
function updateAgencyInfo() {
    const agency = document.getElementById('transportAgency');
    const agencyInfo = document.getElementById('agencyInfo');
    const agencyDetails = document.getElementById('agencyDetails');

    if (!agency || !agencyInfo || !agencyDetails) {
        console.error('Required elements not found');
        return;
    }

    const selectedAgency = agency.value;
    if (selectedAgency && transportAgencies[selectedAgency]) {
        // Show agency information
        const info = transportAgencies[selectedAgency].info;
        agencyDetails.innerHTML = `
            <p class="mb-1"><i class="fas fa-phone me-2"></i>${info.contact}</p>
            <p class="mb-1"><i class="fas fa-envelope me-2"></i>${info.email}</p>
            <p class="mb-1"><i class="fas fa-globe me-2"></i><a href="${info.website}" target="_blank">${info.website}</a></p>
            <p class="mb-2">
                <i class="fas fa-star me-2"></i>${info.rating} (${info.reviews} reviews)
            </p>
            <div class="mt-3">
                <h6 class="mb-2"><i class="fas fa-list me-2"></i>Available Packages:</h6>
                <ul class="list-unstyled mb-0">
                    ${info.packages.map(pkg => `
                        <li class="mb-2">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <i class="fas fa-check-circle text-success me-2"></i>${pkg.name}
                                    <br>
                                    <small class="text-muted ms-4">
                                        <i class="fas fa-clock me-1"></i>${pkg.duration}
                                        <span class="mx-2">|</span>
                                        <i class="fas fa-rupee-sign me-1"></i>₹${pkg.price.toLocaleString()}
                                    </small>
                                </div>
                                <a href="${pkg.link}" target="_blank" class="btn btn-sm btn-outline-primary">
                                    <i class="fas fa-external-link-alt me-1"></i>View Details
                                </a>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        agencyInfo.style.display = 'block';
    } else {
        agencyInfo.style.display = 'none';
    }
}

// Initialize comparison table
function updateComparisonTable() {
    const tableBody = document.getElementById('agencyComparisonTable');
    if (!tableBody) {
        console.error('Comparison table body not found');
        return;
    }

    let tableContent = '';

    // Group packages by agency
    Object.entries(transportAgencies).forEach(([agency, data]) => {
        // Add agency header row with contact info
        tableContent += `
            <tr class="table-primary">
                <td colspan="5">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <h6 class="mb-1">
                                <i class="fas fa-building me-2"></i>
                                ${agency}
                            </h6>
                            <small class="text-muted">
                                <i class="fas fa-phone me-1"></i>${data.info.contact} | 
                                <i class="fas fa-envelope me-1"></i>${data.info.email}
                            </small>
                        </div>
                        <div class="text-end">
                            <div class="mb-1">
                                <i class="fas fa-star text-warning"></i>
                                ${data.info.rating} (${data.info.reviews} reviews)
                            </div>
                            <a href="${data.info.website}" target="_blank" class="btn btn-sm btn-outline-primary">
                                <i class="fas fa-globe me-1"></i>Visit Website
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
        `;

        // Sort packages by price
        const sortedPackages = [...data.info.packages].sort((a, b) => a.price - b.price);

        // Add package rows
        sortedPackages.forEach((pkg, index) => {
            tableContent += `
                <tr class="${index === 0 ? 'table-light' : ''}">
                    <td>
                        <div class="d-flex align-items-center">
                            <i class="fas fa-map-marked-alt text-primary me-2"></i>
                            <div>
                                <strong>${pkg.name}</strong>
                                <br>
                                <small class="text-muted">${pkg.itinerary}</small>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge bg-primary">₹${pkg.price.toLocaleString()}</span>
                    </td>
                    <td>${pkg.duration}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-info" 
                                data-bs-toggle="tooltip" 
                                data-bs-placement="top" 
                                title="${pkg.itinerary}">
                            <i class="fas fa-route me-1"></i>View Details
                        </button>
                    </td>
                    <td>
                        <a href="${pkg.link}" target="_blank" class="btn btn-sm btn-primary">
                            <i class="fas fa-external-link-alt me-1"></i>Book Now
                        </a>
                    </td>
                </tr>
            `;
        });

        // Add a separator row
        tableContent += `
            <tr>
                <td colspan="5" class="p-0">
                    <hr class="my-2">
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = tableContent;

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Add event listener for compare agencies button
document.getElementById('compareAgencies')?.addEventListener('click', function() {
    const compareModal = new bootstrap.Modal(document.getElementById('compareAgenciesModal'));
    compareModal.show();
});

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .route-info {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin-top: 20px;
    }
    .route-info p {
        margin-bottom: 10px;
    }
    .route-info strong {
        color: #495057;
    }
    #helicopterInfo {
        display: none;
        margin-top: 20px;
        padding: 20px;
        background: linear-gradient(to bottom, #ffffff, #f8f9fa);
        border-radius: 12px;
        border: 1px solid #dee2e6;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    #helicopterInfo h5 {
        color: #2c3e50;
        margin-bottom: 20px;
        font-weight: 600;
        border-bottom: 2px solid #007bff;
        padding-bottom: 10px;
    }
    .helicopter-destination {
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 25px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        border: 1px solid #e9ecef;
        transition: all 0.3s ease;
    }
    .helicopter-destination:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .helicopter-destination h6 {
        color: #007bff;
        font-weight: 600;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e9ecef;
    }
    .helicopter-route {
        margin-bottom: 15px;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e9ecef;
        transition: all 0.3s ease;
    }
    .helicopter-route:hover {
        background-color: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        border-color: #007bff;
    }
    .helicopter-route strong {
        color: #2c3e50;
        font-size: 1.1em;
        display: block;
        margin-bottom: 8px;
    }
    .helicopter-route .text-muted {
        font-size: 0.9em;
        line-height: 1.6;
    }
    .helicopter-route .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        padding: 8px 16px;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    .helicopter-route .btn-primary:hover {
        background-color: #0056b3;
        border-color: #0056b3;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .helicopter-route a[href^="tel:"] {
        color: #6c757d;
        font-size: 0.9em;
        transition: color 0.3s ease;
    }
    .helicopter-route a[href^="tel:"]:hover {
        color: #007bff;
        text-decoration: none;
    }
    .alert-info {
        background-color: #e3f2fd;
        border-color: #90caf9;
        color: #0d47a1;
        border-radius: 8px;
        padding: 15px 20px;
        margin-top: 25px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .alert-info i {
        color: #1976d2;
    }
    .alert-info strong {
        color: #1565c0;
    }
    @media (max-width: 768px) {
        .helicopter-route {
            padding: 12px;
        }
        .helicopter-route .text-end {
            margin-top: 10px;
            text-align: left !important;
        }
        .helicopter-route .btn-primary {
            width: 100%;
            margin-bottom: 8px;
        }
    }
`;
document.head.appendChild(style);

// Helper functions
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

function calculateDuration(distance, mode) {
    let speed;
    switch(mode) {
        case 'driving':
            speed = 50; // km/h
            break;
        case 'walking':
            speed = 5; // km/h
            break;
        case 'cycling':
            speed = 15; // km/h
            break;
        default:
            speed = 30; // km/h
    }
    return Math.round((distance / speed) * 60); // Duration in minutes
}

function getRouteType(mode) {
    switch(mode) {
        case 'driving':
            return 'Road Route';
        case 'walking':
            return 'Walking Path';
        case 'cycling':
            return 'Bicycle Route';
        default:
            return 'Custom Route';
    }
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours === 0) {
        return `${mins} min`;
    }
    return `${hours}h ${mins}m`;
}

function getRouteColor(mode) {
    switch(mode) {
        case 'driving':
            return '#007bff'; // Blue
        case 'walking':
            return '#28a745'; // Green
        case 'cycling':
            return '#ffc107'; // Yellow
        default:
            return '#6c757d'; // Gray
    }
}
