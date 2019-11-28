const {
    execSync
} = require('child_process');

class LighthouseBatchManager {

    async runLighthouseBatchAnalysis(pages) {
        this.execCommand('lighthouse-batch -s ' + pages + ' -p "--emulated-form-factor=none"');
    }

    execCommand(command) {
        console.log(`Running command -> ${command}`)
        execSync(command, (err, stdout, stderr) => {
            if (err) {
                console.log(`Error occured when -> ${command}`, err);
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    };
}

module.exports = LighthouseBatchManager
