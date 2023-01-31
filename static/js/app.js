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

