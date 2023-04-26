// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(".saveBtn").on("click", (e) => {
  e.preventDefault()
  var saveBtnEl = $(e.target)
  divId = saveBtnEl.parent("div").attr("id")
  textAreaText = saveBtnEl.siblings("textarea").val()
  localStorage.setItem(divId, textAreaText)
  console.log(divId)
  console.log(localStorage.getItem(divId))
})

function renderTextAreaValuesFromLocalStorage() {
  for (i=9; i<18; i++) {
    var divId = `hour-${i}`
    var text = localStorage.getItem(divId)
    console.log(divId, text)
    var divEl = $("#"+divId)
    divEl.children("textarea").val(text)
  }
}

function applyBoxClassesBasedOnHour() {
  var currentHour = dayjs().hour()
  console.log(currentHour)
  for (i=9; i<18; i++) {
    var divId = `#hour-${i}`
    var divEl = $(divId)
    removeCurrentBoxClass(divEl)
    if (i < currentHour) {
      divEl.addClass("past")
    }
    else if (i == currentHour) {
      divEl.addClass("present")
    } else if (i > currentHour) {
      divEl.addClass("future")
    }
    else {
      console.log("error in applyBoxClassBasedOnHours")
    }
  }
}

function removeCurrentBoxClass(divEl) {
  var classes = ["past", "present", "future"];
  classes.forEach((classStr)=> {
    if (divEl.hasClass(classStr)) {
      divEl.removeClass(classStr);
    }
  });
}

$(document).ready(function () {
  renderTextAreaValuesFromLocalStorage()
  $("#currentDay").text(dayjs().format("M/d/YYYY"))
  applyBoxClassesBasedOnHour()
})

//set interval to run update of text box classes and of time
var intervalId = setInterval(function () {
  applyBoxClassesBasedOnHour()
  $("#currentDay").text(dayjs().format("M/d/YYYY"))
}, 60000)