const LighthouseBatchManager = require('../../managers/lighthouseBatchManager');
const SlackService = require('../../services/slackService');

const lighthouseBatchManager = new LighthouseBatchManager();
const slackService = new SlackService();
const PerformanceMetric = require('../../models/performanceMetric');
const pageEndpointHelper = require('../../helpers/pageEndpointHelper');
const metricNumberCalculatorHelper = require('../../helpers/metricNumberCalculatorHelper');

module.exports = (app) => {

    app.get('/api/report/lighthouse', (req, res) => {
        const pages = pageEndpointHelper.createPageEndpoint();
        lighthouseBatchManager.runLighthouseBatchAnalysis(pages).then(() => {
            try {
                const summary = require('../../report/lighthouse/summary.json');
                for (const page of summary) {
                    let performanceMetric = new PerformanceMetric.Builder()
                        .withScore(metricNumberCalculatorHelper.calculatePerformanceMetric(Number(page.score)))
                        .withPerformance(metricNumberCalculatorHelper.calculatePerformanceMetric(page.detail.performance))
                        .withAccessibility(metricNumberCalculatorHelper.calculatePerformanceMetric(page.detail.accessibility))
                        .withBestPractice(metricNumberCalculatorHelper.calculatePerformanceMetric(page.detail["best-practices"]))
                        .withSeo(metricNumberCalculatorHelper.calculatePerformanceMetric(page.detail.seo))
                        .withPwa(metricNumberCalculatorHelper.calculatePerformanceMetric(page.detail.pwa))
                        .withUrl(page.url)
                        .build();
                    slackService.sendAnalysisToChannel(performanceMetric)
                }
                res.status(200).json({
                    'message': 'Lighthouse report is completed'
                });
            } catch (error) {
                console.error(`An exception occurred on parsing lighthouse summary file`, error)
                res.status(500).json({
                    'message': 'Parsing error occurred'
                });
            }
        }).catch(err => {
            console.error('Error on LighthouseBatchManager - runLighthouseBatchAnalysis', err)
            res.status(500).json({
                'message': 'An unexpected error occurred'
            });
        });
    })
}