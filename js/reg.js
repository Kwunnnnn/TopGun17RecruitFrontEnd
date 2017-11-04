    function getElements() {
        var user_id = document.getElementById('userID_text').value;
        var first = document.getElementById('firstname_text').value;
        var last = document.getElementById('lastname_text').value;
        if(first == null || last == null || user_id < 8) {
            alert("กรุณากรอกข้อมูลให้ครบ");
        }
        else {
            var jsonObj = {"user_id": user_id, "first_name":first, "last_name":last};
            var json = JSON.stringify(jsonObj);
            var url = "http://posttestserver.com/post.php";
            sendDataToSerer(url,json);
            window.localStorage.setItem("user_id", user_id);
            window.location.href = "attention.html";
        }
    }

    function sendDataToSerer(url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(data);
    }
    
