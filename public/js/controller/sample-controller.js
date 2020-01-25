import DomHelper from '../view/dom-helper.js'
/**
 * Controls all audio logic
 */
export default class SampleController {
    constructor() {
        this.sampleCurrentId = -1
        this.isMuted = false
        this.deathSound = new Audio('assets/death.wav')
        this.killSound = new Audio('assets/kill.wav')
        this.scoreNumber = 5
        this.samples = []
        this.scoresSteps = []
        for (let i = 0; i < this.scoreNumber; i++) {
            this.scoresSteps[i] = 10 * (i + 1)
            this.samples[i] = new Audio(`assets/samples/sample${i+1}.wav`)
            this.samples[i].loop = true
            console.log(`assets/samples/sample${i+1}.wav`)
        }
        DomHelper.getVolumeSlider().addEventListener('input', this.updateVolume.bind(this))
    }


    playDeathSound() {
        if (!this.isMuted) {
            this.deathSound.play()
        }
    }

    playKillSound() {
        if (!this.isMuted) {
            this.killSound.play()
        }
    }

    playCurrentSample() {
        this.samples[this.sampleCurrentId].play()
    }

    resetCurrentSample() {
        if (this.sampleCurrentId != -1) {
            this.samples[this.sampleCurrentId].pause()
            this.samples[this.sampleCurrentId].load()
        }
    }

    resetScore() {
        this.resetCurrentSample()
        this.sampleCurrentId = -1
    }

    getSampleIdFromScore(score) {
        const id = ~~(score / 10) - 1
        return (id < this.scoreNumber) ? id : this.scoreNumber - 1
    }

    updateScore(score) {
        const scoreSampleId = this.getSampleIdFromScore(score)
        if(this.sampleCurrentId != scoreSampleId){
            this.resetCurrentSample()
            this.sampleCurrentId = scoreSampleId
            this.playCurrentSample()
        }
    }

    updateVolume() {
        const volume = DomHelper.getVolumeSlider().value
        this.samples.forEach(e => e.volume = volume)
    }

    toggleMute() {
        this.isMuted = !this.isMuted
    }
}
