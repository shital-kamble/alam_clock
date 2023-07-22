// console.log("hii");


const display = document.getElementById('clock');

const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-alarm.digital-clock-beep-989.mp3");
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;

const myList = document.querySelector('#myList');

const addAlarm = document.querySelector('.setAlarm');

//array which will store all the alarms
const alarmList = [];

let count = 1;

//function to play the alarm at correct time

function ringing(now) {
    audio.play();
    alert(`Hey ! it is ${now}`)
}

//function to uppertime & check the array constanly

function UpdateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const mintues = formatTime(today.getMinutes());
    const second = formatTime(today.getSeconds());

    const now = `${hour}:${minutes}:${seconds}`;

    // display.innerText=`:${hours}:${mintues}:${second}`;
    if (alarmList.includes(now) && count === 1) {
        count = count + 1;
        ringing(now);

    }
    else if (seconds === 59) {
        count = 1;
    }
}

//set the correct format of time

function formatTime(time) {

    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;

}
//function to clear alam 
function ClearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alam Cleared');

    }

}
//event to delete a particular alam

myList.addEventListener("click", e => {
    console.log("removing element")
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();

    }
})

//remove an alam from the array

remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;
    alarmList.push.apply(alarmList, newList);
    console.log("newList", newList);
    console.log("alamList", alarmList);

}

//display new alarm on webpages

function showNewAlarm(newAlarm) {
    const html = `<li class="time-list">
                <span class="time"> ${newAlarm}</span>
                <Button class="deleteAlarm time-control" id="delete-button" onclick ="remove(this.value)"value = ${newAlarm}> Delete Alarm</Button>
</li>`

    myList.innerHtml += html
};



//even to set a new alarm when a form js
//submitted and added to the array


addAlarm.addEventListener('submit', e => {
    e.preventDefalut();
    //const newAlam = add.Alarm.alengthtime.value;
    let new_h = formatTime(addAlarm.a_hour.value);
    if (new_h === '0') {
        new_h = '00'
    }
    let new_m = formatTime(addAlarm.a_min.value);
    if (new_m === '0') {
        new_m = '00'
    }
    let new_s = formatTime(addAlarm.a_sec.value);
    if (new_s === '0') {
        new_s = '00'
    }
    const newAlarm = `${new_h}:${new_m}:${new_s}`;
    if (isNaN(newAlarm)) {
        if (!alarmList.includes(newAlarm)) {

            alarmList.push(newAlarm);

            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    }
    else {
        alert("Invalid time Enteredr ")
    }
})
