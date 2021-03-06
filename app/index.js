import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import { locale } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "seconds";

const dElem = document.getElementById("dateText");
const hmElem = document.getElementById("hoursMinutesText");
const sElem = document.getElementById("secondsText");
const hrElem = document.getElementById("heartRateText");
const bElem = document.getElementById("batteryText");

//HeartRateSensor
const hrs = new HeartRateSensor();
hrs.start();


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  dElem.text = util.getWeekDay(today.getDay(),locale)+ " "+ today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = util.monoDigits(hours % 12 || 12, false);
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.monoDigits(today.getMinutes());
  let secs = util.monoDigits(today.getSeconds());
  hmElem.text = hours + ':' + mins;
  sElem.text = secs;  
  if(hrs.heartRate == null){
    hrElem.text = "--bpm";
  }else{
    hrElem.text = hrs.heartRate + "bpm";
  }
  bElem.text =  battery.chargeLevel + "%";
  if(battery.chargeLevel >= 75){
    bElem.style.fill = "lime";
  }else if(battery.chargeLevel >= 35){
    bElem.style.fill = "yellow";
  }else{
    bElem.style.fill = "red";
  }
}
