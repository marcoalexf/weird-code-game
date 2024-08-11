export const generateUniqueCoordinates = (biasCount: number) => {
    const coordinates = [];
    const usedCoordinates = new Set();
  
    while (coordinates.length < biasCount) {  // Maximum should be the number of bias percentage
      const x = Math.floor(Math.random() * 10);  // Random x coordinate between 0 and 9
      const y = Math.floor(Math.random() * 10);  // Random y coordinate between 0 and 9
      const coordinate = `${x},${y}`;
  
      if (!usedCoordinates.has(coordinate)) {
        coordinates.push([x, y]);
        usedCoordinates.add(coordinate);
      }
    }
  
    return coordinates;
}