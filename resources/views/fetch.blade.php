<html>
<head>
    <title>fetch data as host</title>

    <style>
        body {
            font-family: fantasy;
            font-weight: bold;
        }
        .form {
            margin: 130px auto auto 150px;
            display: block;
            width: 10rem;
        }
        input {
            width: 333px;
            height: 50px;
            border-radius: 8px;
            margin-top: 10px;
        }
        textarea {
            width: 335px;
            margin-top: 10px;
            border-radius: 5px;
            height: 100px;
        }
    </style>
</head>


<body>

    <div class="form">
        <form action="#" id="form">
            <input type="text" placeholder="GET" name="method">
            <input type="text" placeholder="URL" name="url" value="http://127.0.0.1:8000/api/">
            <input type="text" placeholder="Authorization" name="authorization" value="">
            <textarea type="text" placeholder="data" name="data"></textarea>
            <input type="submit" value="submit">
        </form>
    </div>

<script async defer>

    function openNewPage(data) {
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
            <html>
            <head>
              <title>صفحه جدید</title>
            </head>
            <body>
                <p>${data}</p>
            </body>
            </html>
       `);
        // newWindow.document.close();
    }


    const form = document.getElementById('form');
    form.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(form);



// DlONdLQ0YlQAVbjAznmeCopwrDZ2z8xcBIfg3u7vc3eef526
// {
//     "module_id" : 41,
//     "server_id" : 1,
//     "username" : "mohammadi",
//     "password" : "1",
//     "data" : {
//        "cell_list[0].cell_id" : "tesss"
//     }
// }




            fetch(formData.get('url'), {
                method : formData.get('method'),

                headers: formData.get('authorization')
                    ? {'Content-Type': 'application/json', 'Accept' : 'application/json', 'Authorization' : 'Bearer ' + formData.get('authorization')}
                    : {'Content-Type': 'application/json', 'Accept' : 'application/json'},

                body : formData.get('method') === 'POST'
                    ? formData.get('data')
                    : null
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error('Network response was not ok');

                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    // openNewPage(data)
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });

    })

</script>

</body>
</html>
