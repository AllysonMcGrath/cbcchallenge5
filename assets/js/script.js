var currentDay = moment().format("dddd, MMM Do");

function timeBefore(timeStr) {
   var currentTime = moment().format("ha");
   return moment(currentTime, "ha").isBefore(moment(timeStr, "ha")) 
};
 
function timeAfter(timeStr) {
   var currentTime = moment().format("ha");
   return moment(currentTime, "ha").isAfter(moment(timeStr, "ha")) 
};

 
$("#currentDay").text(currentDay);
 
var taskHash = JSON.parse(localStorage.getItem("taskList")) || {};

$(".time-block").append('<h3 class="hour col-2"></h3>',
'<textarea class="task-input col-9"></textarea>',
'<button class="saveBtn col-1"><i class="fas fa-save"></i></button>');

$(".hour").each(function() {
   var hourId = ($(this).parent().attr('id'));
   $(this).html(hourId);
});

$(".time-block").each(function(){
   var hourId = $(this).attr('id');
   $(this).find("textarea").attr("id",  hourId + "-text");
   $(this).find("button").attr("id", hourId + "-button");
})

displayTasks();

function displayTasks() {
   $(".task-input").each(function(){
      var k = $(this).attr("id");
      if (k in taskHash) {
         var value = taskHash[k];
         $(this).html(value);
      }
      if (timeBefore(k.replace("-text", ""))) {
         $(this).attr("class", "task-input col-9 future")
      }
      else if (timeAfter(k.replace("-text", ""))) {
         $(this).attr("class", "task-input col-9 past")
      }
      else {
         $(this).attr("class", "task-input col-9 present")
      }
   })
};

$(".time-block").on("click", "button", function(event) {
   var textId = $(this).attr("id").replace("-button", "-text");
   event.preventDefault();
   var inputTask = $("#" + textId).val().trim();
   taskHash[textId] = inputTask;
   localStorage.setItem("taskList", JSON.stringify(taskHash));
   displayTasks();
});
 
