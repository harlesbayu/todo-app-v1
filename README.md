#MYAPP - TODOLISTAPP

## HOW TO USE APP

```
Lakukan npm install pada folder server.
Jalankan perintah "npm start" pada terminal *(membuaka terminal pada folder server).
Jalankan perintah live-server pada terminal *(membuaka terminal pada folder client).
Jalankan mongod pada terminal, atau bisa menggunakan database MLAB, Keteranangan ada pada file .env
```

##SERVER SIDE 

###TODO

|           Route           |  HTTP  |                         Description                        |
|---------------------------|--------|------------------------------------------------------------|
| /todo/findTask            | GET    | Menampilkan aktifitas berdasarkan user                     |
| /todo/create              | POST   | Membuat daftar aktifitas baru                              |
| /todo/update/:id          | PUT    | Memperbaharui aktifitas                                    |
| /todo/delete/:id          | DELETE | Menghapus akitiftas                                        |
| /todo/complete/:id        | PUT    | Update aktifitas ke status complete                        |
| /todo/uncomplete/:id      | PUT    | Update aktifitas ke status complete uncomplete             |
| /todo/quotes/             | GET    | MEnampilkan kalimat mutiara                                |


###USER

|           Route           |  HTTP  |                         Description                        |
|---------------------------|--------|------------------------------------------------------------|
| /users/signup             | POST   | Registrari User                                            |
| /users/signin             | POST   | Login user                                                 |
| /users/signinFb           | POST   | Login user melalui facebook                                |
| /users/signinGoogle       | POST   | Login user melalui google                                  |
| /users/update/:id         | PUT    | Update User                                                |
| /users/delete/:id         | DELETE | Delete User                                                |


```
Flow aplikasi :
user melakukan registrasi secara manual atau bisa masuk menggunakan google sigin atau facebook sigin
setelah berhasil melakukan registrasi, user akan menerima email berupa informasi berhasil mendaftar ke
aplikasi todolistApp.

Setelah berhasil login user dapat mebuat aktifitas / task dengan cara mengisi form pada fitur add task.
User dapat memberikan status complete dan uncomplete terhadap task yang sudah dibuat.


Keterangan lain :
Validasi registrasi ataupun login sudah di handle secara keseluruhan,
untuk validasi pembuatan task / activitiy belum dibuat validasinya.
```


## TOOLS YANG DIGUNAKAN

* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [live-server](https://www.npmjs.com/package/live-server)
* [nodemailer](https://www.npmjs.com/package/mongoose)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [express](https://www.npmjs.com/package/express)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [postman](https://www.getpostman.com)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [axios](https://www.npmjs.com/package/axios)
* [cors](https://www.npmjs.com/package/cors)
* [MLab](https://www.mlab.com)


