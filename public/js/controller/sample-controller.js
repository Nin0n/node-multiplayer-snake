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
        this.scoreNumber = 6
        this.samples = []
        this.scoresSteps = []
        for (let i = 0; i < this.scoreNumber; i++) {
            this.scoresSteps[i] = 10 * (i + 1)
            this.samples[i] = new Audio(`assets/samples/sample${i+1}.ogg`)
            this.samples[i].loop = true
            console.log(`assets/samples/sample${i+1}.ogg`)
        }
        DomHelper.getVolumeSlider().addEventListener('input', this.updateVolume.bind(this))
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        this.vol = this.audioContext.createGain()
        this.vol.gain.value = 0.025
        this.vol.connect(this.audioContext.destination)
        this.waveList = ['sawtooth', 'sine', 'triangle', 'square']
        this.waveIndex = 0
    }

    playEatSound(score) {
        if (!this.isMuted) {
            const oscillator = this.audioContext.createOscillator()
            oscillator.connect(this.vol)
            oscillator.type = this.waveList[this.waveIndex]
            oscillator.frequency.value = 70 + (2*score)
            oscillator.start()
            oscillator.stop(this.audioContext.currentTime + 0.3)
        }
    }

    swappy(){
        this.waveIndex++
        this.waveIndex %= 4
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
        this.playEatSound(score)
        const scoreSampleId = this.getSampleIdFromScore(score)
        if(this.sampleCurrentId != scoreSampleId){
            this.resetCurrentSample()
            this.sampleCurrentId = scoreSampleId
            this.playCurrentSample()
        }
    }

    updateVolume() {
        value = DomHelper.getVolumeSlider().value
        this.samples.forEach(e => e.volume = value)
        this.vol.gain.value = value / 10
    }

    toggleMute() {
        this.isMuted = !this.isMuted
    }
}
