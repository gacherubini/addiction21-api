const express = require('express');
const axios = require('axios');
const Addicast = require('../models/addicast');
const Track = require('../models/track');


const router = express.Router();


const soundCloudApi = "https://api.soundcloud.com"
const client_id= "EKAIa2h9ncPWkdxcZcnDz60W5V3i3XXN"
const client_secret= "Hv5uraDJGc2pMSOI6H3MF2zPoRjOHcnr"

// Obtain access token from SoundCloud API

// async function obtainAccessToken() {

//   // Request SoundCloud API in order to get the access token
//   const response = await axios.post(`https://api.soundcloud.com/oauth2/token?grant_type=client_credentials&client_id=EKAIa2h9ncPWkdxcZcnDz60W5V3i3XXN&client_secret=Hv5uraDJGc2pMSOI6H3MF2zPoRjOHcnr`, {
//     headers: {
//       'accept': 'application/json; charset=utf-8',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   });

//   if (response.status === 200) {
//     const oauthTokenResponse = response.data;
//     return oauthTokenResponse.access_token;
//   } else {
//     // Handle the error or return an error message as needed
//     throw new error('Failed to obtain access token');
//   }
// }

async function getSoundCloudAccessToken() {
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

    const accessToken = response.data.access_token;
    // Use the accessToken as needed in your application

    console.log('Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    throw error;
  }
}


// List tracks from SoundCloud Addicast playlist

router.get('/', async (req, res) => {
 try {
    const playlistId = '1012283755'; // addicast playlist on soundcloud

    const accessToken = await getSoundCloudAccessToken(); // Wait for the token

    const soundCloudEndpoint = `${soundCloudApi}/users/${playlistId}/tracks`;

    // Make the Axios request to SoundCloud API
    const response = await axios.get(soundCloudEndpoint, {
      headers: {
        'accept': 'application/json; charset=utf-8',
        'Authorization': `OAuth ${accessToken}`
      }
    });

    const soundCloudData = await response.data;

    
    // Filter tracks by the start of their names
    const desiredStart = 'ADDICAST'; // Replace with the desired start of the name
    const filteredTracks = soundCloudData.filter(track => track.title.startsWith(desiredStart));


    res.status(200).json(filteredTracks)

 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve SoundCloud data' });
 }
});

// Detail a track from SoundCloud

router.get('/:id', async (req, res) => {
  try { 
    const accessToken = await getSoundCloudAccessToken(); // Wait for the token
     const soundCloudEndpoint = `https://api.soundcloud.com/tracks/${req.params.id}`;
 
     // Make the Axios request to SoundCloud API
     const response = await axios.get(soundCloudEndpoint, {
       headers: {
         'accept': 'application/json; charset=utf-8',
         'Authorization': `OAuth ${accessToken}`
       }
     });
 
     const soundCloudData = await response.data;
 
     res.status(200).json(soundCloudData)
 
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Failed to retrieve SoundCloud data' });
  }
 });
 

module.exports = router;
