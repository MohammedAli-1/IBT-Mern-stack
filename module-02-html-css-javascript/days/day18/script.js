'use strict';

// ==========================================
// PART 1: Function Basics
// ==========================================

// Sum any number of distances
const sumDistances = (...distances) => {
    return distances.reduce((total, distance) => total + distance, 0);
};

console.log(sumDistances(2,3,5))
// Calculate base fare
// Default rate is 15 ETB per km
const calculateBaseFare = (totalDistance, ratePerKm = 15) => {
    return totalDistance * ratePerKm;
};
console.log(calculateBaseFare(sumDistances(2,3,5)))
// Format amount as ETB
const formatCurrency = (amount) => {
    return `${amount.toFixed(2)} ETB`;
};
// ==========================================
// PART 2: Higher-Order Functions
// ==========================================

function makeSurgeMultiplier(surgeRate) {
    return (baseFare) => {
        return baseFare * surgeRate;
    };
}

// ==========================================
// PART 3: Closures
// ==========================================

function makeDriverTracker() {

    // Private variable
    let tripsCompleted = 0;

    return {
        recordTrip: () => {
            tripsCompleted++;
        },

        getTrips: () => {
            return tripsCompleted;
        }
    };
}


// ==========================================
// PART 4: Composition & Callbacks
// ==========================================

function generateReceipt(distances, surgeFn, tracker, callback) {

    // 1. Record the trip
    tracker.recordTrip();

    // 2. Calculate total distance
    // Spread the array into the rest parameter
    const totalDistance = sumDistances(...distances);

    // 3. Calculate base fare
    const baseFare = calculateBaseFare(totalDistance);

    // 4. Apply surge pricing
    const finalFare = surgeFn(baseFare);

    // 5. Format final fare
    const formattedFare = formatCurrency(finalFare);

    // 6. Create receipt message
    const receipt = `Trip #${tracker.getTrips()}: Total Fare is ${formattedFare}.`;

    // 7. Send receipt to callback
    callback(receipt);
}


// ==========================================
// TESTING YOUR CODE
// ==========================================

// 1. Setup driver tracker
const tayesTracker = makeDriverTracker();

// Standard pricing = 1x
const standardPricing = makeSurgeMultiplier(1.0);

// Rush hour pricing = 1.5x
const rushHourPricing = makeSurgeMultiplier(1.5);


// 2. Callback function
const printToConsole = (message) => console.log(message);


// ==========================================
// RIDE 1: Standard Pricing
// ==========================================

// 2km + 3km = 5km
// 5 × 15 = 75 ETB
generateReceipt(
    [2, 3],
    standardPricing,
    tayesTracker,
    printToConsole
);

// Expected:
// Trip #1: Total Fare is 75.00 ETB.


// ==========================================
// RIDE 2: Rush Hour Pricing
// ==========================================

// 10km × 15 = 150 ETB
// 150 × 1.5 = 225 ETB
generateReceipt(
    [10],
    rushHourPricing,
    tayesTracker,
    printToConsole
);

// Expected:
// Trip #2: Total Fare is 225.00 ETB.