var is24HourFormat = false;
var setHours = null;
var setMinutes = null;
var isHighlightEnabled = false;
let date;

document.getElementById('dateInput').value = getCurrentDate();
document.getElementById('timeInput').value = getCurrentTime24();

function toggleHighlight() {
    isHighlightEnabled = !isHighlightEnabled;
    updateClock();

    // Show or hide relevant elements based on highlight status
    if (isHighlightEnabled) {
        document.getElementById('dateInput').style.display = 'block';
        document.getElementById('timeInput').style.display = 'none';
        document.getElementById('saveChangesButton').style.display = 'block';
    } else {
        document.getElementById('dateInput').style.display = 'none';
        document.getElementById('timeInput').style.display = 'block';
    }
}

function getWeekdayName(day) {
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[day];
}

function updateClock() {
    var now = new Date();
    if (setHours !== null && setMinutes !== null && date != null) {
        now = new Date(date + "T" + getCurrentTime24());
        now.setHours(setHours, setMinutes);
    }

    // Rest of the code remains unchanged...
    // (Your existing code for updating the clock)
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var day = now.getDate();
    var month = now.getMonth() + 1; // Month is 0-indexed
    var year = now.getFullYear();
    var period = is24HourFormat ? '' : (hours >= 12 ? 'PM' : 'AM');
    var weekday = getWeekdayName(now.getDay());

    // Convert 24-hour format to 12-hour format
    hours = is24HourFormat ? hours : hours % 12 || 12;

    // Add leading zero if needed
    hours = padZero(hours);
    minutes = padZero(minutes);
    seconds = padZero(seconds);
    day = padZero(day);
    month = padZero(month);

    var clockElement = document.getElementById('clock');
    if (isHighlightEnabled) {
        clockElement.style.backgroundColor = '#FFFF00'; // Change to your desired highlight color
    } else {
        clockElement.style.backgroundColor = '#f4f4f4'; // Reset to the default background color
    }
    clockElement.style.backgroundColor = 'black';
    clockElement.style.color = 'white'
    clockElement.innerHTML = `${weekday}, ${day}/${month}/${year}<br>${hours}:${minutes}:${seconds} ${period}`;
}

function saveChanges() {
        var newDate = document.getElementById('dateInput').value;
        date = newDate;
        // updateClock();
        var newTime = document.getElementById('timeInput').value;
        var timeArray = newTime.split(':');
        var newHours = parseInt(timeArray[0], 10);
        var newMinutes = parseInt(timeArray[1], 10);

        // Validate the entered time
        if (!isNaN(newHours) && !isNaN(newMinutes) && newHours >= 0 && newHours < 24 && newMinutes >= 0 && newMinutes < 60) {
            setHours = newHours;
            setMinutes = newMinutes;

            // Update the clock with the new time
            updateClock();
        } else {
            alert("Invalid time format. Please enter a valid time (HH:mm).");
        }

    // Hide the save changes button after saving
    document.getElementById('saveChangesButton').style.display = 'none';
    document.getElementById('dateInput').style.display = 'block';
    document.getElementById('timeInput').style.display = 'block';
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    updateClock();
}

function getCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = padZero(now.getMonth() + 1); // Month is 0-indexed
    var day = padZero(now.getDate());
    return `${year}-${month}-${day}`;
}

function getCurrentTime24() {
    var now = new Date();
    var hours = padZero(now.getHours());
    var minutes = padZero(now.getMinutes());
    var seconds = padZero(now.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function setNewTime() {
    var newTime = prompt("Enter the new time (HH:mm):", "12:00");

    if (newTime !== null) {
        var timeArray = newTime.split(':');
        var newHours = parseInt(timeArray[0], 10);
        var newMinutes = parseInt(timeArray[1], 10);

        // Validate the entered time
        if (!isNaN(newHours) && !isNaN(newMinutes) && newHours >= 0 && newHours < 24 && newMinutes >= 0 && newMinutes < 60) {
            setHours = newHours;
            setMinutes = newMinutes;

            // Update the clock with the new time
            updateClock();
        } else {
            alert("Invalid time format. Please enter a valid time (HH:mm).");
        }
    }
}

function displayTime(zone) {
    var options = { 
        timeZone: zone, 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        weekday: 'long', 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    };

    return new Date().toLocaleString('en-GB', options);
}

function addTimeZonesToHTML(timeZones) {
    var container = document.getElementById('timeZonesContainer');

    timeZones.forEach(function(zone) {
        var timeZoneElement = document.createElement('div');
        timeZoneElement.id = 'zone_' + zone.replace(/\W/g, '_');
        timeZoneElement.textContent = zone + ': ' + displayTime(zone);
        timeZoneElement.style.color = 'white'
        container.appendChild(timeZoneElement);
    });
}

// Example time zones
var timeZones = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];

// Add time zones to HTML
addTimeZonesToHTML(timeZones);

function updateTimes() {
    var timeZones = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];

    timeZones.forEach(function(zone) {
        var timeZoneElement = document.getElementById('zone_' + zone.replace(/\W/g, '_'));
        timeZoneElement.textContent = zone + ': ' + displayTime(zone);
    });
    console.log(2)
}
setInterval(updateClock, 1000); // Update every second
updateClock(); // Initial call to display clock
setInterval(updateTimes, 1000);
console.log("test commit")