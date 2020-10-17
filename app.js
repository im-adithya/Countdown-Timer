const clock = document.getElementById('clock');
const hours = clock.querySelector('.hours');
const minutes = clock.querySelector('.minutes');
const seconds = clock.querySelector('.seconds');

const reset = document.getElementById('reset')
const pause = document.getElementById('pause')
const start = document.getElementById('start')

const time = document.getElementById('time')

let pausetog = false
let deadline = 0

function remainingTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return { total, hours, minutes, seconds };
}

function startClock(endtime) {

    function updateClock() {
        const t = remainingTime(endtime);

        hours.innerHTML = ('0' + t.hours).slice(-2);
        minutes.innerHTML = ('0' + t.minutes).slice(-2);
        seconds.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }

        pause.onclick = function () {
            if (!pausetog) {
                pausetog = true
                pause.innerHTML = 'Resume'
                clearInterval(timeinterval);
            } else {
                pausetog = false
                pause.innerHTML = 'Pause'
                let present = hours.innerHTML * 3600000 + minutes.innerHTML * 60000 + seconds.innerHTML * 1000
                startClock(new Date(Date.parse(new Date()) + present))
            }
        }

        reset.onclick = function () {
            hours.innerHTML = '00'
            minutes.innerHTML = '00'
            seconds.innerHTML = '00'
            clearInterval(timeinterval)
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);

}

start.onclick = function () {
    let times = time.value.split(':')
    deadline = times[0] * 3600000 + times[1] * 60000 + times[2] * 1000
    if (deadline) {
        startClock(new Date(Date.parse(new Date()) + deadline))
    } else {
        alert("Enter a valid time")
    }
}