## Dawid Kalinowski, grupa 4
Aplikacja keycloak to prosty serwis, który po autentykacji poprzez keycloak, wysyła nas na podstronę która wyświetla pewien tekst. (zabezpieczenie frontendu).  
Aplikacja, którą nazwałem "API", to aplikacja, która po autentykacji OAuth 2.0 za pośrednictwem serwisu GitHub, pozwala nam skorzystać z podanego endpointu. W tym przypadku endpoint ten zwraca zwykłą stronę wyświetlającą dowolną informację. (zabezpieczenie backendu).    
# Aplikacja keycloak
Docker image ze skonfigurowanym realmem w keycloak:  https://hub.docker.com/repository/docker/fjlgnrejlgbtrjl/keycloak/general 
Keycloack powinien działać na porcie 4000 

### Uruchamianie

W katalogu `demokeycloak` instalujemy wszystkie zależnosci za pomocą `npm install` oraz uruchamiamy frontend komedą `npm run dev`. Port powinien wyświetlić się w konsoli.

Serwer uruchamiamy wchodząc w katalog `backend`, oraz wpisując `node index.js`. Port powinien wyświetlić się w konsoli.  


# Aplikacja API
Aplikacja API ma na celu zabezpieczenie API OAuth 2.0 od GitHuba, i jest niezależna od aplikacji opisanej powyżej.  
Wchodzimy w katalog `API`, oraz wpisujemy komendę `node server.js`. Aplikacja działa w  http://localhost:3000/  
Klikamy na wielki guzik 😀
