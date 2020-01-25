const Timidity = require('timidity')

const player = new Timidity()
player.load('../midi/mario.mid')
player.play()

player.on('playing', () => {
  console.log(player.duration) // => 351.521
})