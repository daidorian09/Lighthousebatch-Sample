function calculatePerformanceMetric(metric) {
    return typeof metric === 'number' && metric ?
        Math.round(+metric * 100) :
        0;
}

module.exports = {
    calculatePerformanceMetric: calculatePerformanceMetric
}