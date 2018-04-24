var loggedin;
var employee;
var volunteer;
var user;
var username;

//function showLandingPage() {
//    hideAll();
//    document.getElementById("landing").hidden = false;f
//}

function loginMenu() {
    if (loggedin == false) {
        document.getElementById("login").hidden = false;
        document.getElementById("register").hidden = false;
        document.getElementById("dashboard-tab").hidden = true;
//        document.getElementById("account-div").hidden = true;
        document.getElementById("logout").hidden = true;
    } else {
        document.getElementById("login").hidden = true;
        document.getElementById("register").hidden = true;
        document.getElementById("dashboard-tab").hidden = false;
//        document.getElementById("account-div").hidden = false;
        document.getElementById("logout").hidden = false;
    }
}

function gotoDashboard() {
    document.getElementById("landing").hidden = true;
    if (employee == true) {
        showEmpDashboard();
    } else if (volunteer == true) {
        showVolDashboard();
    } else {
        showUserDashboard();
    }
}

function showHome(){
    hideAll();
    document.getElementById("landing").hidden = false;
}

function hideAll() {
    document.getElementById("emDashboard").hidden = true;
    document.getElementById("volDashboard").hidden = true;
    document.getElementById("userDashboard").hidden = true;
    hideOverlay();
}

function hideOverlay(){
    document.getElementById("loginOverlay").hidden = true;
    document.getElementById("loginOverlay").style.display = "block";
    document.getElementById("registerOverlay").hidden = true;
    document.getElementById("registerOverlay").style.display = "block";
}

function showEmpDashboard() {
    document.getElementById("emDashboard").hidden = false;
    document.getElementById("volDashboard").hidden = true;
    document.getElementById("userDashboard").hidden = true;
}

function showVolDashboard() {
    document.getElementById("emDashboard").hidden = true;
    document.getElementById("volDashboard").hidden = false;
    document.getElementById("userDashboard").hidden = true;
}

function showUserDashboard() {
    document.getElementById("emDashboard").hidden = true;
    document.getElementById("volDashboard").hidden = true;
    document.getElementById("userDashboard").hidden = false;
}

function showLogin() {
    document.getElementById("loginOverlay").hidden = false;
}

function showRegister() {
    document.getElementById("registerOverlay").hidden = false;
}

function checkLogin() {
    if (databaseLogin(document.getElementById('username').value, document.getElementById('password').value)) {
      loggedin = true;
      if (getStatus(databaseLogin(document.getElementById('username').value) == 'emp')) {
          employee = true;
          volunteer = true;
          user = true;
//          showEmpDashboard();
      } else if (getStatus(databaseLogin(document.getElementById('username').value) == 'vol')) {
          volunteer = true;
          user = true;
//          showVolDashboard();
      } else {
          user = true;
//          showUserDashboard();
      }
      username = document.getElementById('username').value;
      loginMenu();
      hideOverlay();
    } else {
        document.getElementById("loginError").innerHTML = "<font color=\"red\">Username and/or password incorrect</font>";
    }
}

function loggingOut(){
    employee = false;
    volunteer = false;
    user = false;
    loggedin = false;
    document.getElementById("landing").show;
//    showLandingPage();
    loginMenu();
}

$(document).ready(function() {

    employee = false;
    volunteer = false;
    user = false;
    loggedin = false;

//    hideAll();
//    showEmpDashboard();
    loginMenu();


    $('.calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      defaultDate: '2018-03-12',
      navLinks: true, // can click day/week names to navigate views
      businessHours: true, // display business hours
      editable: true,
      events: [
        {
          title: 'Business Lunch',
          start: '2018-03-03T13:00:00',
          constraint: 'businessHours'
        },
        {
          title: 'Meeting',
          start: '2018-03-13T11:00:00',
          constraint: 'availableForMeeting', // defined below
          color: '#257e4a'
        },
        {
          title: 'Conference',
          start: '2018-03-18',
          end: '2018-03-20'
        },
        {
          title: 'Party',
          start: '2018-03-29T20:00:00'
        },

        // areas where "Meeting" must be dropped
        {
          id: 'availableForMeeting',
          start: '2018-03-11T10:00:00',
          end: '2018-03-11T16:00:00',
          rendering: 'background'
        },
        {
          id: 'availableForMeeting',
          start: '2018-03-13T10:00:00',
          end: '2018-03-13T16:00:00',
          rendering: 'background'
        },

        // red areas where no events can be dropped
        {
          start: '2018-03-24',
          end: '2018-03-28',
          overlap: false,
          rendering: 'background',
          color: '#ff9f89'
        },
        {
          start: '2018-03-06',
          end: '2018-03-08',
          overlap: false,
          rendering: 'background',
          color: '#ff9f89'
        }
      ]
    });

  });

/* Stub Area */
function databaseLogin (username, password) {
  if ((username == 'baldguy') && (password == 'password')) {
      return true;
  }
  return false;
}

function getStatus(username) {
  return 'emp';
}