function map(value: number, oldLow: number, oldHigh: number, newLow: number, newHigh: number): number {
    // Check if the value is within the old range
    if (value < oldLow || value > oldHigh) {
        throw new Error('Value is outside the old range');
    }

    // Calculate the percentage of the value within the old range
    const percentage = (value - oldLow) / (oldHigh - oldLow);

    // Map the percentage to the new range
    const newValue = newLow + percentage * (newHigh - newLow);

    return newValue;
}

export { map }