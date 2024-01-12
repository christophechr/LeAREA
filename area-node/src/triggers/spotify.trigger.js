

const isThisSong = async(user, params) => {

    const {operator, songname} = params;
    if (!user || !songname)
        return false;

        const apiUrl = 'https://api.spotify.com/v1/me/player/currently-playing';
        
        const headers = {
          Authorization: `Bearer ${user.SpotifyToken}`,
          'Content-Type': 'application/json',
        };
        
        const fetchConfig = {
          method: 'GET',
          headers: headers,
        };
        
        const returnVal = await fetch(apiUrl, fetchConfig)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            if (data.item.name.toLowerCase().includes(songname.toLowerCase())) {
                return true;
            }
            return false;
          })
          .catch(error => {
            console.error('Erreur lors de la requête:', error);
          });
        if (returnVal === true || returnVal === false) {
            return returnVal;
        }
        return false;
}

module.exports = {
    isThisSong
};
