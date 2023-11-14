const express = require('express');
const axios = require('axios');
const Addicast = require('../models/addicast');
const Track = require('../models/track');


const router = express.Router();


const soundCloudApi = "https://api.soundcloud.com"
let accessToken = ''; // Store the access token
let refreshToken = ''; // Store the refresh token


async function checkSoundCloudAccessToken(error) {
  //if (error.response != null && error.response.status === 401) {
    if (true) {
      
    console.log('Access Token is expired. Refreshing...');
    const isRefreshSuccessful =  await refreshSoundCloudAccessToken();
  } 
}

function convertCreatedAtToYYYYMMDD(apiResponse) {
  const isoDate = apiResponse.created_at;
  const date = new Date(isoDate);
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}



async function getSoundCloudAccessToken() {

  // throw new Error("erro teste");

  if(accessToken == '') {
    const apiUrl = 'https://api.soundcloud.com/oauth2/token';
    const clientId = 'EKAIa2h9ncPWkdxcZcnDz60W5V3i3XXN';
    const clientSecret = 'Hv5uraDJGc2pMSOI6H3MF2zPoRjOHcnr';
    
    try {
      const response = await axios.post(apiUrl, {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }, {
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
  
      accessToken = response.data.access_token;
      refreshToken = response.data.refresh_token;
  
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
  
      return accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

}

async function refreshSoundCloudAccessToken() {
  const apiUrl = 'https://api.soundcloud.com/oauth2/token';
  const clientId = 'EKAIa2h9ncPWkdxcZcnDz60W5V3i3XXN';
  const clientSecret = 'Hv5uraDJGc2pMSOI6H3MF2zPoRjOHcnr';

  try {
        // Check if refreshToken is available
    if (refreshToken == '') {
       console.error('Error: Refresh token not available.');
      return;
    }

    const response = await axios.post(apiUrl, {
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }, {
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;


    console.log('Refreshed Access Token:', accessToken);
    console.log('Refreshed Token:', refreshToken);


    return true;
  } catch (error) {
    console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Endpoint: addicast
// Get a list of addicasts, it has a filter implementation inside
router.get('/', async (req, res) => {
  try {

    await getSoundCloudAccessToken();

    const playlistId = '1012283755'; // addicast playlist on soundcloud

    const soundCloudEndpoint = `${soundCloudApi}/users/${playlistId}/tracks`;

    // Make the Axios request to SoundCloud API
    const response = await axios.get(soundCloudEndpoint, {
      headers: {
        'accept': 'application/json; charset=utf-8',
        'Authorization': `OAuth ${accessToken}`
      }
    });

    const soundCloudData = response.data;

    
   
    // Filter tracks by the start of their names
    const desiredStart = 'ADDICAST'; // Replace with the desired start of the name
    const filteredTracks = soundCloudData.filter(track => track.title.startsWith(desiredStart));
    const filteredTracksNew = filteredTracks.map(track => ({
      ...track,
      artwork_url: track.artwork_url.replace('large.jpg', 't500x500.jpg')
    }));
        

    res.status(200).json(filteredTracksNew)

 } catch (error) {
    await checkSoundCloudAccessToken(error);
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve SoundCloud data' });
 }
});

// Endpoint: addicast/:id
// Detail a track from SoundCloud 
router.get('/:id', async (req, res) => {
  try { 
    await getSoundCloudAccessToken();

     const soundCloudEndpoint = `https://api.soundcloud.com/tracks/${req.params.id}`;
 
     // Make the Axios request to SoundCloud API
     const response = await axios.get(soundCloudEndpoint, {
       headers: {
         'accept': 'application/json; charset=utf-8',
         'Authorization': `OAuth ${accessToken}`
       }
     });
 
     const soundCloudData = response.data;

    soundCloudData.created_at = convertCreatedAtToYYYYMMDD(soundCloudData);

    soundCloudData.artwork_url = soundCloudData.artwork_url.replace('large.jpg', 't500x500.jpg');

     res.status(200).json(soundCloudData)
 
  } catch (error) {
     await checkSoundCloudAccessToken(error);
     console.error(error);
     res.status(500).json({ error: 'Failed to retrieve SoundCloud data' });
  }
 });
 

module.exports = router;
