/* three state checkbox*/
function ts(cb) {
  if (cb.readOnly) cb.checked=cb.readOnly=false;
  else if (!cb.checked) cb.readOnly=cb.indeterminate=true;
}

/* color three state checkbox based on selection */
function inp(cb) {
    var state='N'
    if (cb.checked) {
        state='Y';
        document.getElementById('l'+cb.id).classList.add('list-group-item-danger')
    }
    else if (cb.indeterminate) {
        state='';
        document.getElementById('l'+cb.id).classList.remove('list-group-item-danger')
        document.getElementById('l'+cb.id).classList.remove('list-group-item-success')
    }
    else {
        document.getElementById('l'+cb.id).classList.remove('list-group-item-danger')
        document.getElementById('l'+cb.id).classList.add('list-group-item-success')
    }
//    console.log("input: --> " + cb.id + ":" + state)
    sendJSON(cb.id, state)
}

function inp2(cb) {
    var state='N'
    if (cb.checked) {
        state='Y';
        document.getElementById('r'+cb.id).classList.add('table-danger')
    }
    else if (cb.indeterminate) {
        state='';
        document.getElementById('r'+cb.id).classList.remove('table-danger')
        document.getElementById('r'+cb.id).classList.remove('table-success')
    }
    else {
        document.getElementById('r'+cb.id).classList.remove('table-danger')
        document.getElementById('r'+cb.id).classList.add('table-success')
    }
//    console.log("input: --> " + cb.id + ":" + state)
    sendJSON(cb.id, state)
}

function onLoadUpdStates() {
//    console.log("onLoad")
    callCb = document.getElementsByClassName('form-check-input')
    for (let i = 0; i < callCb.length; i++) {
        if (callCb[i].value == 'Y')
            callCb[i].checked = true
        else if (callCb[i].value == 'None') {
            callCb[i].indeterminate=true
        }
    }
}

function apiCall(url, data) {
    let xhr = new XMLHttpRequest();

    // open a connection
    xhr.open("POST", url);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sending data with the request
    xhr.send(JSON.stringify(data));

    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        alert(`Error ${this.status}: ${this.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        console.log(`Got ${this.response.length} bytes`);
        var txt = document.getElementById('testText');
        txt.innerHTML=JSON.parse(this.response).resp;
      }
    }
}

function apiTest(elm) {
    var txt = document.getElementById('twoText');
    apiCall("/api/v1/senddata", { "fromUI": txt.innerHTML})
}

function sendJSON(id, state) {
    apiCall("/api/v1/appType", { "id": id, "state": state })
}

function editAlias(elm) {
    var myModal = new bootstrap.Modal(document.getElementById('aliasEdit'));
    var modalBodyInput = document.getElementById('AliasName');
    modalBodyInput.value = elm.innerHTML;
    let parID=elm.parentElement.id.split("_")[1];
    modalBodyInput.setAttribute("parID", parID);
    myModal.show()
}

function saveAlias() {
    let input = document.getElementById('AliasName');
    let parID=input.getAttribute("parID")
    apiCall("/api/v1/updateAlias", { "id": parID, "name": input.value })
    let par=document.getElementById('rno_'+parID).children[2];
    par.innerHTML=input.value;
}