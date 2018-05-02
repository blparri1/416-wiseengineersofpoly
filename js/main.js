var loggedin;
var employee;
var volunteer;
var user;
var username;
var items;
var driverNum;

//function showLandingPage() {
//    hideAll();
//    document.getElementById("landing").hidden = false;f
//}

function loginMenu() {
    if (loggedin == false) {
        document.getElementById("login").hidden = false;
        document.getElementById("register").hidden = false;
        document.getElementById("dashClick").hidden = true;
//        document.getElementById("dashboard-tab").hidden = true;
//        document.getElementById("account-div").hidden = true;
        document.getElementById("logout").hidden = true;
    } else {
        document.getElementById("login").hidden = true;
        document.getElementById("register").hidden = true;
//        document.getElementById("dashboard-tab").hidden = false;
//        document.getElementById("account-div").hidden = false;
        document.getElementById("dashClick").hidden = false;
        document.getElementById("logout").hidden = false;
    }
}

function gotoDashboard() {
    //document.getElementById("landing").hidden = true;
    document.getElementById("dashboardOverlay").hidden = false;
    if (employee == true) {
        pullEmpEvents(username);
        pullEmpShuttles(username);
        pullEmpEquip(username);
        pullVolEquip(username);
        pullVolEvents(username);
        pullUserRooms(username);
        pullUserEquipment(username);
        pullUserCatering(username);
        pullUserShuttles(username);
        pullUserDonations(username);

        showEmpDashboard();
    } else if (volunteer == true) {
        pullVolEquip(username);
        pullVolEvents(username);
        pullUserRooms(username);
        pullUserEquipment(username);
        pullUserCatering(username);
        pullUserShuttles(username);
        pullUserDonations(username);

        showVolDashboard();
    } else {
        pullUserRooms(username);
        pullUserEquipment(username);
        pullUserCatering(username);
        pullUserShuttles(username);
        pullUserDonations(username);

        showUserDashboard();
    }
}

//function showHome(){
//    hideAll();
//    document.getElementById("landing").hidden = false;
//}

function hideAll() {
    document.getElementById("emDashboard").hidden = true;
    document.getElementById("volDashboard").hidden = true;
    document.getElementById("userDashboard").hidden = true;
    hideOverlay();
}

function hideOverlay(){
    document.getElementById("loginOverlay").hidden = true;
    document.getElementById("registerOverlay").hidden = true;
	document.getElementById("checkoutOverlay").hidden = true;
    document.getElementById("changeDriverOverlay").hidden = true;
    document.getElementById("changeShuttleTimeOverlay").hidden = true;
    document.getElementById("changeEquipmentOverlay").hidden = true;
    document.getElementById("dashboardOverlay").hidden = true;
}

function hideEditOverlay(){
    document.getElementById("changeDriverOverlay").hidden = true;
    document.getElementById("changeShuttleTimeOverlay").hidden = true;
    document.getElementById("changeEquipmentOverlay").hidden = true;
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

function checkout() {
	document.getElementById("checkoutOverlay").hidden = false;
}

function checkLogin() {
    if (databaseLogin(document.getElementById('username').value, document.getElementById('password').value)) {
      loggedin = true;
      if (getStatus(databaseLogin(document.getElementById('username').value) == 'emp')) {
          employee = true;
          volunteer = true;
          user = true;
      } else if (getStatus(databaseLogin(document.getElementById('username').value) == 'vol')) {
          volunteer = true;
          user = true;
      } else {
          user = true;
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
    location.reload();
}

function registerNewUser() {
    document.getElementById("registerOverlay").hidden = true;
    addUserToDatabase(document.getElementById('newUsername').value, document.getElementById('newEmail').value, document.getElementById('newPassword').value);

}

//Employee Dashboard******************************
function pullEmpEvents(username) {
    var returnData = "<table width=\"100%\"><tr><td width=\"20%\"><u>Event</u></td><td width=\"20%\"><u>Poc</u></td><td width=\"10%\"><u>Room #</u></td><td width=\"10%\"><u>Time Begin</u></td><td width=\"10%\"><u>Time End</u></td><td width=\"30%\"><u>Equipment</u></td></tr>"
    var dataFromServer = getEmpEvents(username);
    for (var i = 0; i < dataFromServer.length; i++) {
        returnData = returnData + "<tr id='empEvent"+i+"'><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td><td>" + dataFromServer[i][2] + "</td><td>" + dataFromServer[i][3] + "</td><td>" + dataFromServer[i][4] + "</td><td>" + dataFromServer[i][5] + "</td><td><input type=\"button\" value=\"Delete\" onclick=\"empDeleteEvent(" + i + ")\"></td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("employeeEvents").innerHTML = returnData;
}

function pullEmpShuttles(username) {
    var returnData = "<table width=\"100%\"><tr><td width=\"25%\"><u>Poc</u></td><td width=\"10%\"><u>Vehicle Type</u></td><td width=\"10%\"><u>Vehicle ID</u></td><td width=\"10%\"><u>Start Time</u></td><td width=\"10%\"><u>End Time</u><td></td><td width=\"20%\"><u>Distance</u></td><td width=\"15%\"><u>Driver</u></td></tr>";
    var dataFromServer = getEmpShuttles(username);
    for (var i = 0; i <dataFromServer.length; i++) {
        returnData = returnData + "<tr><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td><td>" + dataFromServer[i][2] + "</td><td id='shuttleStart" + i + "'>" + dataFromServer[i][3] + "</td><td id='shuttleEnd" + i + "'>" + dataFromServer[i][4] + "</td><td><input type=\"button\" value=\"Change\" onclick=\"changeShuttleTime(" + i + ")\"></td><td>" + dataFromServer[i][5] + "</td><td id='driver" + i + "'>" + dataFromServer[i][6] + "</td><td><input type=\"button\" value=\"Change\" onclick=\"changeDriver(" + i + ")\"></td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("employeeShuttles").innerHTML = returnData;
}

function pullEmpEquip(username) {
    var returnData = "<table width=\"100%\"><tr><td width=\"25%\"><u>Poc</u></td><td width=\"15%\"><u>Checkout Date</u></td><td width=\"15%\"><u>Checkin Date</u></td><td width=\"45%\"><u>Equipment</u></td><td></td></tr>";
    var dataFromServer = getEmpEquip(username);
    for (var i = 0; i < dataFromServer.length; i++) {
        returnData = returnData + "<tr><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td><td>" + dataFromServer[i][2] + "</td><td id='empEquipment"+ i + "'>" + dataFromServer[i][3] + "</td><td><input type=\"button\" value=\"Change\" onclick=\"changeEquipment(" + i + ")\"></td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("employeeEquip").innerHTML = returnData;
}

function changeDriver(driver) {
    driverNum = driver;
    document.getElementById("changeDriverOverlay").hidden = false;
}

function updateDriver() {
    hideEditOverlay();
    document.getElementById("driver" + driverNum).innerHTML = document.getElementById("newDriver").value;
    updateDriverDatabase(driverNum, document.getElementById("newDriver").value);
}

function changeShuttleTime(num) {
    driverNum = num;
    document.getElementById("changeShuttleTimeOverlay").hidden = false;
}

function updateShuttleTime() {
    hideEditOverlay();
    document.getElementById("shuttleStart" + driverNum).innerHTML = document.getElementById("updateShuttleStart").value;
    document.getElementById("shuttleEnd" + driverNum).innerHTML = document.getElementById("updateShuttleEnd").value;
    updateShuttleTimeDatabase(driverNum, document.getElementById("updateShuttleStart").value, document.getElementById("updateShuttleEnd").value);
}

function empDeleteEvent(num) {
    document.getElementById("empEvent" + num).remove();
    removeEvent("employeeEvent", num);
}

function changeEquipment(num){
    driverNum = num;
    document.getElementById("changeEquipmentOverlay").hidden = false;
}

function updateEquipment(){
    hideEditOverlay();
    document.getElementById("empEquipment" + driverNum).innerHTML = document.getElementById("updateEquipment").value;
    updateEquipmentDatabase(driverNum, document.getElementById("updateEquipment").value);
}

//Volunter Items****************
function pullVolEvents(username) {
    var returnData = "<table width=\"100%\"><tr><td width=\"20%\"><u>Event</u></td><td width=\"20%\"><u>Poc</u></td><td width=\"10%\"><u>Room #</u></td><td width=\"10%\"><u>Time Begin</u></td><td width=\"10%\"><u>Time End</u></td><td width=\"30%\"><u>Equipment</u></td></tr>"
    var dataFromServer = getVolEvents(username);
    for (var i = 0; i < dataFromServer.length; i++) {
        returnData = returnData + "<tr id='empEvent"+i+"'><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td><td>" + dataFromServer[i][2] + "</td><td>" + dataFromServer[i][3] + "</td><td>" + dataFromServer[i][4] + "</td><td>" + dataFromServer[i][5] + "</td><td><input type=\"button\" value=\"Volunteer\" onclick=\"volEvent(" + i + ")\"></td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("volEvents").innerHTML = returnData;
}

function pullVolEquip(username) {
    var returnData = "<table width=\"100%\"><tr><td width=\"25%\"><u>Poc</u></td><td width=\"15%\"><u>Checkout Date</u></td><td width=\"15%\"><u>Checkin Date</u></td><td width=\"45%\"><u>Equipment</u></td></tr>";
    var dataFromServer = getVolEquip(username);
    for (var i = 0; i < dataFromServer.length; i++) {
        returnData = returnData + "<tr><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td><td>" + dataFromServer[i][2] + "</td><td id='empEquipment"+ i + "'>" + dataFromServer[i][3] + "</td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("volEquip").innerHTML = returnData;
}

//User Items*******************

function pullUserRooms(user) {
    var returnData = "<table width=\"100%\"><tr><td width=\"25%\"><u>Room</u></td><td width=\"25%\"><u>Date</u></td><td width=\"25%\"><u>Start Time</u></td><td width=\"25%\"><u>End Time</u></td></tr>";
    var dataFromServer = getUserRooms(username);
    for (var i = 0; i < dataFromServer.length; i++) {
        returnData = returnData + "<tr><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td><td>" + dataFromServer[i][2] + "</td><td>" + dataFromServer[i][3] + "</td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("userRooms").innerHTML = returnData;
}

function pullUserEquipment(user) {
    var returnData = "<table width=\"100%\"><tr><td width=\"15%\"><u>Start Date</u></td><td width=\"15%\"><u>End Date</u></td><td width=\"15%\"><u>Start Time</u></td><td width=\"15%\"><u>End Time</u></td><td width=\"40%\"><u>Equipment</u></td></tr>";
    var dataFromServer = getUserEquip(username);
    for (var i = 0; i < dataFromServer.length; i++) {
        returnData = returnData + "<tr><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td><td>" + dataFromServer[i][2] + "</td><td>" + dataFromServer[i][3] + "</td><td>" + dataFromServer[i][4] + "</td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("userEquip").innerHTML = returnData;
}

function pullUserCatering(user) {
    var returnData = "<table width=\"100%\"><tr><td width=\"15%\"><u>Date</u></td><td width=\"15%\"><u>Start Time</u></td><td width=\"15%\"><u>End Time</u></td><td width=\"55%\"><u>Food Requested</u></td></tr>";
    var dataFromServer = getUserCatering(username);
    for (var i = 0; i < dataFromServer.length; i++) {
        returnData = returnData + "<tr><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td><td>" + dataFromServer[i][2] + "</td><td>" + dataFromServer[i][3] + "</td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("userCater").innerHTML = returnData;
}

function pullUserShuttles(user) {
    var returnData = "<table width=\"100%\"><tr><td width=\"15%\"><u>Date</u></td><td width=\"15%\"><u>Type</u></td><td width=\"15%\"><u>Number</u></td><td width=\"15%\"><u>Start Time</u></td><td width=\"15%\"><u>End Time</u></td><td width=\"25%\"><u>Distance</u></td></tr>";
    var dataFromServer = getUserShuttles(username);
    for (var i = 0; i < dataFromServer.length; i++) {
        returnData = returnData + "<tr><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td><td>" + dataFromServer[i][2] + "</td><td>" + dataFromServer[i][3] + "</td><td>" + dataFromServer[i][4] + "</td><td>" + dataFromServer[i][5] + "</td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("userShuttles").innerHTML = returnData;
}

function pullUserDonations(user) {
    var returnData = "<table width=\"100%\"><tr><td width=\"15%\"><u>Date</u></td><td width=\"85%\"><u>Amount</u></td></tr>";
    var dataFromServer = getUserDonations(username);
    for (var i = 0; i < dataFromServer.length; i++) {
        returnData = returnData + "<tr><td>" + dataFromServer[i][0] + "</td><td>" + dataFromServer[i][1] + "</td></tr>";
    }
    returnData = returnData + "</table>";
    document.getElementById("userDonations").innerHTML = returnData;
}


$(document).ready(function() {

    employee = false;
    volunteer = false;
    user = false;
    loggedin = false;
    loginMenu();


    $('.calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      defaultDate: '2018-05-02',
      navLinks: true, // can click day/week names to navigate views
      businessHours: true, // display business hours
      editable: true,
      events: [
        {
          title: 'Rockband Practice \nOzzy Osborne',
          start: '2018-05-03T13:00:00',
          constraint: 'concertHours'
        },
        {
          title: "Capple Wedding\nBarbra Cappel",
          start: '2018-05-13T11:00:00',
          constraint: 'wedding', // defined below
          color: '#257e4a'
        },
          {
              title: "The Mason Wedding \n Colley Ballroom",
              start: '2018-05-25T11:00:00',
              constraint: 'wedding', // defined below
              color: '#257e4a'
          },
          {
              title: "The Goldberg Wedding \n Colley Ballroom",
              start: '2018-04-30T11:00:00',
              constraint: 'wedding', // defined below
              color: '#257e4a'
          },
        {
          title: 'Volunteer Spanish Lessons – by Silvia Gonzales',
          start: '2018-05-18',
          end: '2018-05-20',
            color: '#aaafff'
        },
        {
          title: 'Gamer\'s Night \nby Carl Smith',
          start: '2018-05-29T20:00:00',
            color: '#ffaa54'
        },
          {
              title: 'Volunteer Arts & Crafts \nby Cynthia Blake',
              start: '2018-05-14T20:00:00',
              color: '#ffaa54'
          },
          {
              title: 'Singles Mixer',
              start: '2018-05-09T20:00:00',
              color: '#ffaa54'
          },

        // areas where "Meeting" must be dropped
        {
          title: 'Charity Drive\n Barrow Neurological Institute ',
          start: '2018-05-11T10:00:00',
          end: '2018-05-12T16:00:00',
            color: '#aaafff'
        },
          {
              title: 'Lupus Handbag Luncheon & Silent Auction',
              start: '2018-05-21T10:00:00',
              end: '2018-05-22T16:00:00',
              color: '#aaafff'
          },
        {
          title: 'Graduation Party \nColley Ballroom',
          start: '2018-05-17T10:00:00',
          end: '2018-05-17T16:00:00',
            color: '#caddaa'
        },
          {
              title: 'Johnson\'s 50th \nWedding Anniversary',
              start: '2018-05-07T10:00:00',
              end: '2018-05-07T16:00:00',
              color: '#caddaa'
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

function getEmpEvents(user) {
    var item2 = ["Steve's Birthday", "Steve Stevens", "2", "12:00", "15:00", "20x Folding Chairs, 5x Tables"];
    var item3 = ["Rockband Practice", "Ozzy Osborne", "1", "13:00", "16:00", ""];
    var item4 = ["Capple Wedding", "Barbra Cappe", "2", "18:00", "22:00", "40x Folding Chairs, 10x Standard Tables, Catering Services from outside company"];
    var item5 = ["Gamer's Night", "Carl Smith", "1", "18:00", "23:59", "10x Folding Chairs, 1x Tables"];
    var item1 = ["Random", "That guy", "3", "9:00", "18:00", "20x Folding Chairs, 5x Tables"];
    var returndata = [item1, item2, item3, item4, item5];
    return returndata;
}

function getEmpShuttles(user) {
    var item1 = ["Steve Stevens", "Bus", "1", "11:00", "12:00", "40 miles", "Steve"];
    var item2 = ["Barbra Cappe", "Van", "2", "12:00", "13:00", "20 miles", "POC"];
    var item3 = ["Random Guy", "bus", "2", "6:00", "22:00", "423 miles", "POC"];
    var returndata = [item1, item2, item3];
    return returndata;
}

function getEmpEquip(user) {
    var item1 = ["A. Random Guy", "4/30/2018", "5/10/2018", "100x Folding Chairs, 10x Standard Tables"];
    var item2 = ["B. Rando Dude", "4/30/2018", "5/2/2018", "10x Folding Chairs"];
    var item3 = ["That one guy", "4/30/2018", "5/3/2018", "11x Folding Chairs"];
    var returndata = [item1, item2, item3];
    return returndata;
}

function getCart() {
	//TODO get a list of all the items in the shopping cart
	items = [];
	
	items[0] = ["Donation", 50, 1, 50];
	items[1] = ["Room Reservation: Monday May 7th 8:00AM to 8:00PM", 0, 3, 3];
	items[2] = ["Shuttle: Monday May 5th 5:PM", 1.50, 30, 4.5];
	
	return items;
}

function getVolEvents(user) {
    var item2 = ["Steve's Birthday", "Steve Stevens", "2", "12:00", "15:00", "20x Folding Chairs, 5x Tables"];
    var item3 = ["Rockband Practice", "Ozzy Osborne", "1", "13:00", "16:00", ""];
    var item4 = ["Capple Wedding", "Barbra Cappe", "2", "18:00", "22:00", "40x Folding Chairs, 10x Standard Tables, Catering Services from outside company"];
    var item5 = ["Gamer's Night", "Carl Smith", "1", "18:00", "23:59", "10x Folding Chairs, 1x Tables"];
    var item1 = ["Random", "That guy", "3", "9:00", "18:00", "20x Folding Chairs, 5x Tables"];
    var returndata = [item1, item2, item3, item4, item5];
    return returndata;
}

function getVolEquip(user) {
    var item2 = ["B. Rando Dude", "4/30/2018", "5/2/2018", "10x Folding Chairs"];
    var returndata = [item2];
    return returndata;
}

function getUserRooms(user) {
    var item1 = ["1", "4/30/2018", "10:00",  "14:00"];
    var returndata = [item1];
    return returndata;
}

function getUserEquip(user) {
    var item1 = ["4/30/2018", "4/30/2018", "10:00",  "14:00" , "10x Folding Chairs"];
    var returndata = [item1];
    return returndata;
}

function getUserCatering(user) {
    var item1 = ["4/30/2018", "10:00",  "14:00" , "10x Mexian Dishes"];
    var returndata = [item1];
    return returndata;
}

function getUserShuttles(user) {
    var item1 = ["4/3/2018", "Van", "2", "9:00", "10:00", "20 miles"];
    var item2 = ["4/3/2018", "Van", "2", "14:00", "15:00", "20 miles"];
    var returndata = [item1, item2];
    return returndata;
}

function getUserDonations(user) {
    var item1 = ["$125.00", '2/4/2018'];
    return [item1];
}

function updateDriverDatabase(num, name){
    //do nothing - STUB
}

function updateShuttleTimeDatabase(num, start, end) {
    //do nothing - STUB
}

function removeEvent(typeOfUser, num){
    //do nothing - STUB
}

function updateEquipmentDatabase(num, equipment) {
    //do nothing - STUB
}

function volEvent(event) {
    //do Nothing - Stub
}

function addUserToDatabase(name, email, pass) {
    //do Nothing - Stub
}

