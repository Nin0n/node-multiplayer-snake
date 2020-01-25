import DomHelper from '../view/dom-helper.js';
/**
 * Controls all audio logic
 */
export default class samplesController {
    constructor() {
        this.isMuted = false;
        this.melody = new Audio('assets/samples/melody.wav');
        this.kick = new Audio('assets/samples/kick.wav');
        this.kick_loop = new Audio('assets/samples/kick.wav');
        this.hihat = new Audio('assets/samples/hihat.wav');
        this.hihat_loop = new Audio('assets/samples/hihat_loop.wav');
        this.snare = new Audio('assets/samples/snare.wav');
        this.scoresSteps = [10,20,30,40,50];
        this.samples = [];
        this.samples[0] = new Audio('assets/samples/sample1.wav');
        this.samples[1] = new Audio('assets/samples/sample2.wav');
        this.samples[2] = new Audio('assets/samples/sample3.wav');
        this.samples[3] = new Audio('assets/samples/sample4.wav');
        this.samples[4] = new Audio('assets/samples/sample5.wav');
        this.state = -1;
        for (let i = 0; i <= this.scoresSteps.length - 1; i++) {
            this.samples[i].loop = true;
        }
        DomHelper.getVolumeSlider().addEventListener('input', this.updateVolume.bind(this));
    }

    playKickSound() {
        if (!this.isMuted) {
            this.kick.play();
        }
        // ADDED
		this.kick.play();
    }

    playSnareSound() {
        if (!this.isMuted) {
            this.snare.play();
        }
    }

    playHihatSound() {
        if (!this.isMuted) {
            this.hihat.play();
        }
    }

    playMelodySound() {
        if (!this.isMuted) {
            this.melody.play();
        }
    }

    playSample(id) {
        this.samples[id].play();
    }

    resetCurrentSample() {
        if (this.state != -1) {
            this.samples[this.state].pause();
            this.samples[this.state].load();
        }
    }

    resetSampler() {
        this.resetCurrentSample();
        this.state = -1;
    }

    updateSample(score) {
        if (this.state != this.scoresSteps.length-1 && score >= this.scoresSteps[this.state+1]) {
            this.resetCurrentSample();
            this.state += 1;
            this.playSample(this.state);
        }
    }

    updateVolume() {
        const volume = DomHelper.getVolumeSlider().value;
        this.kick.volume = volume;
        this.snare.volume = volume;
        this.hihatSound.volume = volume;
        this.melodySound.volume = volume;
        this.sample1.volume = volume;
        this.sample2.volume = volume;
        this.sample3.volume = volume;
        this.sample4.volume = volume;
        this.sample5.volume = volume;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
    }
}
