const countTimer = deadline => {
    const timerHours = document.querySelector("#timer-hours"),
        timerMinutes = document.querySelector("#timer-minutes"),
        timerSeconds = document.querySelector("#timer-seconds"),
        dateStop = new Date(deadline).getTime();
    // eslint-disable-next-line prefer-const
    let timerId;

    const getTimeRemaining = () => {
        const dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor(timeRemaining / 60) % 60,
            hours = Math.floor(timeRemaining / 3600);
        return { hours, minutes, seconds, timeRemaining };
    };
    const updateTime = () => {
        const timer = getTimeRemaining();
        if (timer.timeRemaining > 0) {
            timerHours.textContent = ("00" + timer.hours).slice(-2);
            timerMinutes.textContent = ("00" + timer.minutes).slice(-2);
            timerSeconds.textContent = ("00" + timer.seconds).slice(-2);
        } else {
            timerHours.textContent = "00";
            timerMinutes.textContent = "00";
            timerSeconds.textContent = "00";
            document.querySelector("#timer").style.color = "red";
            clearInterval(timerId);
        }
    };
    updateTime();
    timerId = setInterval(updateTime, 1000);
};
export default countTimer;
