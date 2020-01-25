import DomHelper from '../view/dom-helper.js';
/**
 * Controls all audio logic
 */
export default class SampleController {
    constructor() {
        this.sampleCurrentId = -1;
        this.isMuted = false;
        this.deathSound = new Audio('assets/death.wav');
        this.killSound = new Audio('assets/kill.wav');
        this.scoreNumber = 5;
        this.samples = [];
        this.scoresSteps = [];
        for (let i = 0; i < this.scoreNumber; i++) {
            this.scoresSteps[i] = 10 * (i + 1)
            this.samples[i] = new Audio(`assets/samples/sample${i+1}.wav`);
            this.samples[i].loop = true;
            console.log(`assets/samples/sample${i+1}.wav`)
        }
        DomHelper.getVolumeSlider().addEventListener('input', this.updateVolume.bind(this));
    }


    playDeathSound() {
        if (!this.isMuted) {
            this.deathSound.play();
        }
    }

    playKillSound() {
        if (!this.isMuted) {
            this.killSound.play();
        }
    }

    playCurrentSample() {
        this.samples[this.sampleCurrentId].play();
    }

    resetCurrentSample() {
        if (this.sampleCurrentId != -1) {
            this.samples[this.sampleCurrentId].pause();
            this.samples[this.sampleCurrentId].load();
        }
    }

    resetScore() {
        this.resetCurrentSample();
        this.sampleCurrentId = -1;
    }

    updateScore(score) {
        if (this.sampleCurrentId < this.scoreNumber && score >= this.scoresSteps[this.sampleCurrentId+1]) {
            this.resetCurrentSample();
            this.sampleCurrentId++;
            this.playCurrentSample();
        }
    }

    updateVolume() {
        const volume = DomHelper.getVolumeSlider().value;
        this.samples.forEach(e => e.volume = volume);
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
    }
}
