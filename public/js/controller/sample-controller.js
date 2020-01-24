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

    updateVolume() {
        const volume = DomHelper.getVolumeSlider().value;
        this.kick.volume = volume;
        this.snare.volume = volume;
        this.hihatSound.volume = volume;
        this.melodySound.volume = volume;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
    }
}
