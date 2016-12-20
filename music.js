$(window).load(function() {
    var bufferLoader;
    var context = new AudioContext(),
    oscillator = null;
    var mousedown = false;
    var gainNode = context.createGain();
    document.body.addEventListener('mousedown', function (e) {
        // Mouse has been pressed
        mousedown = true;
        console.log(e);
        oscillator = context.createOscillator();
        oscillator.frequency.value = calculateFrequency(e.clientX);
        oscillator.connect(context.destination);
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        oscillator.start(context.currentTime);
    });

    document.body.addEventListener('mouseup', function () {
        // Mouse has been released
        mousedown = false;
        if (oscillator) {
            oscillator.stop(context.currentTime);
            oscillator.disconnect();
        }
    });
    document.body.addEventListener('mousemove', function (e) {
        if(mousedown){
            oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
            gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);
        }
    });
});

var calculateFrequency = function (mouseXPosition) {
  var minFrequency = 20,
      maxFrequency = 2000;

  return ((mouseXPosition / window.innerWidth) * maxFrequency) + minFrequency;
};

var calculateGain = function (mouseYPosition) {
  var minGain = 0,
      maxGain = 1;

  return 1 - ((mouseYPosition / window.innerHeight) * maxGain) + minGain;
};
