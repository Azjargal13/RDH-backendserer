function submitJobFunction () {
    if (!((document.getElementById("inputJobFile").value == null) || (document.getElementById("inputJobFile").value == ""))) {
        //get file from uploaded files input.
        //--------Currently working with 1 file--------   Modify below to process multiple input
        var uploadedFile = document.getElementById("inputJobFile").files[0];
        var myFileSizeInKB = document.getElementById("inputJobFile").files[0].size;

        myFileSizeInKB = myFileSizeInKB/1024;
        myFileSizeInKB = myFileSizeInKB.toFixed(2);

        console.log("Client got file: " + uploadedFile.name);
        console.log("Client got file size in KB: " + myFileSizeInKB);

        
        fetch("http://localhost:3000/testServer")
        .then(function (response) {
            console.log(response);
            return response.json();
        }) 
        .then(function (data) {
            console.log(data);
            document.getElementById("responseFromServer").value = data.message;
        })
    }
    else {
        alert("Please select a file");
    }
}