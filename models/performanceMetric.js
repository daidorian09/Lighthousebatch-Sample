class PerformanceMetric {
    constructor(build) {
        this.score = build.score;
        this.performance = build.performance;
        this.accessibility = build.accessibility;
        this.bestPractice = build.bestPractice;
        this.seo = build.seo;
        this.pwa = build.pwa;
        this.url = build.url;
    }

    static get Builder() {
        class Builder {
            constructor() {}

            withScore(score) {
                this.score = score;
                return this;
            }

            withPerformance(performance) {
                this.performance = performance;
                return this;
            }

            withAccessibility(accessibility) {
                this.accessibility = accessibility;
                return this;
            }

            withBestPractice(bestPractice) {
                this.bestPractice = bestPractice;
                return this;
            }

            withSeo(seo) {
                this.seo = seo;
                return this;
            }

            withPwa(pwa) {
                this.pwa = pwa;
                return this;
            }

            withUrl(url) {
                this.url = url;
                return this;
            }

            build() {
                return new PerformanceMetric(this);
            }
        }
        return Builder;
    }
}

module.exports = PerformanceMetric
