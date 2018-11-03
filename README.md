# Aplicație pentru managementul melodiilor favorite integrată cu Spotify

----
## Introducere

* **Care este principala nevoie/problemă pe care o rezolvă produsul vostru?**

   Fie ca esti vesel sau trist, ca vrei sa te distrezi sau sa inveti mai bine, muzica este resursa la care poti apela oricand. Echipa noastra, Fast&Curious, este de parere  ca muzica este o parte importanta din viata fiecaruia, asa ca ne-am gandit sa cream o aplicatie prin care utilizatorii sa aiba usor acces atat la muzica pe care o iubesc, cat si sa descopere muzica noua, potrivita cu gusturile lor. Asadar, proiectul nostru are, pe langa functia de a crea rapid playlist-uri cu melodiile preferate, si scopul de a facilita procesul de cautare al unui cantec in functie de vreme sau de starea de spirit a utilizatorului. Folosind Spotify API si Weather API, ne dorim astfel sa cream un manager de melodii favorite care sa ii poata face utilizatorului si recomandari influentate de preferintele actuale si starea de spirit pe care vremea de afara i-o poate induce. Incercam astfel sa oferim o experienta personalizata pentru fiecare utilizator – aplicatia intelegand si adaptandu-se la starea si gusturile clientului. Totodata, noi consideram util ca utilizatorul sa poata afla, daca isi doreste, detalii legate de muzica aleasa, astfel incat ii punem la dispozitie diverse statistici legate de caracteristicile audio ale pieselor, de autorii acestora si nu numai.

*  **Cărui tip de utilizatori se adresează produsul vostru?**

   In acelasi timp, deoarece consideram ca pasiunea pentru muzica nu are varsta, credem ca tipul de utilizatori de care il avem in vedere nu se poate inscrie intr-un tipar, pentru ca ne dorim ca proiectul nostru sa poata fi folositor oricui, indiferent de gusturi, hobby-uri sau stare de spirit.

* **Ce alte produse similare există în piață?**

   Aplicatia noastra va functiona intr-un domeniu in care exista deja destul de multi competitori foarte cunoscuti, cum ar fi Apple Music, Google Play Music, Spotify, Deezer, Tidal, Zonga, SoundCloud si multi altii. Totusi, din cercetarea de piata pe care am facut-o pana acum, nu am gasit un produs care sa prezinte aceeasi functionalitate de recomandare de melodii in functie de starea utilizatorului pe care o propunem noi, asa ca noi suntem increzatori in faptul ca vom aduce un plus de valoare industriei si ca ne vom face remarcati prin serviciul nostru intuitiv la dorintele clientului, usor de folosit si gratis.


----
## Interfețele aplicației

----
## Componentele aplicației
1. Listă de features ale melodiilor
2. Widget meteo
3. Listă de melodii recomandate
4. Previzualizare detalii și caracteristici melodie
5. Playlist
6. Căutare melodii

----

## REST API

**Request**

    POST /preferences?preferences={preferencesParam}

Utilizatorul își adaugă preferințele inițiale, pentru a putea primi recomandări.

**Request** 

    PUT /preferences?preferences={newPreferences}

Utilizatorul își schimbă preferințele.

**Request**

    GET /songs?search={weatherParam} 
În funcție de prognoza meteo, platforma întoarce o listă cu melodii specifice, conform preferințelor alese de utilizator.

**Response generic** 

    [
        {
        „name”:”Song’s name”;
        „category”:”Song’s category”;
        „artist:”:”Song’s artist”;
        }
    ]

**Request**

    GET /songs?search={songName}
Platforma oferă posibilitatea căutarii unei melodii în funcție de numele său.

**Request**

    GET /features?song={songParam}

Întoarce o listă cu caracteristicile melodiei.

**Response**

    [
        {
            "danceability" : 0.735,
            "energy" : 0.578,
            "valence" : 0.624,
            "duration_ms" : 255349,
            "artist": "song's artist",
            "album": "song's album",
            "likes": 0
        }
    ] 

**Request**

    POST /playlist?playlistName={playlistNameParameter}&songName={songNameParameter}
Utilizatorul are posibilitatea să adauge melodiile preferate intr-un playlist.


**Request**

    GET /playlist?search={playlistName}&orderBy={songName}
Sunt afișate melodiile ordonate alfabetic din playlist-ul dorit.


**Request**

    DELETE /playlist?playlistName={playlistNameParameter}&songName={songNameParameter}

Utilizatorul poate șterge o anumită melodie din playlist dată ca parametru sau poate șterge întreg playlist-ul daca nu este specificat al doilea parametru.


---
## Acțiunile utilizatorilor
 
1. Alegerea preferințelor în materie de muzică, în 
   funcție de tipul de vreme
1. Posibilitatea de a schimba preferințele
1. Vizualizarea melodiilor recomandate în funcție de preferințele de vreme
1. Căutarea unei melodii după numele acesteia
1. Vizualizarea unor detalii și statistici referitoare la o melodie selectată sau căutată
1. Adăugarea unei melodii din cele recomandate de aplicație la playlist / favorites
1. Vizualizarea melodiilor din playlist-ul creat
1. Ștergerea unei melodii din playlist sau a întregului playlist





