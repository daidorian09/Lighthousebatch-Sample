module.exports = (app) => {
    app.get('/api/monitoring/readiness', (req, res) => {
        res.status(200).json({
            message: 'app is up & run'
        });
    })

    app.get('/api/monitoring/liveness', (req, res) => {
        res.status(200).json({
            message: 'app is up & run'
        });
    })
}