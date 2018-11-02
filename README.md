# Aplicație pentru managementul melodiilor favorite integrată cu Spotify

----
## Introducere

* **Care este principala nevoie/problemă pe care o rezolvă produsul vostru?**

   Suntem de părere că muzica este o parte importantă din viața fiecăruia, astfel încât aplicația noastră are scopul de a facilita procesul de căutare a unui cântec în funcție de vreme sau de starea de spirit a utilizatorului, și apoi de a salva rapid  melodiile preferate. De aceea, noi vrem să implementăm o aplicație web pentru managementul de melodii favorite, folosind Spotify API. Totodată, noi considerăm util ca utilizatorul să cunoască mai multe detalii despre muzica aleasă, astfel încât îi punem la dispoziție o serie de statistici referitoare la aceasta. Prin intermediul lor, utilizatorul poate să vizualizeze caracteristicile audio ale compoziției precum și alte trăsături folositoare. Pentru a oferi o experiență personalizată, aplicația adaptează UI-ul în funcție de starea utilizatorului raportată la prognoză.

*  **Cărui tip de utilizatori se adresează produsul vostru?**

 Deoarece pasiunea pentru muzică nu are vârstă, alegem să ne adresam unui public cât mai larg, indiferent de gusturi, hobby-uri sau stare de spirit. :)

* **Ce alte produse similare există în piață?**

 Alte produse similare deja existente pe piață sunt: **Deezer, Tidal, iTunes, Zonga, SoundCloud**



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


**Request** 

    PUT /preferences?preferences={newPreferences}


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





