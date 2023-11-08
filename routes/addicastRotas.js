const express = require('express');
const axios = require('axios');
const Addicast = require('../models/addicast');

const router = express.Router();

router.get('/', async (req, res) => {
 try {
    const playlistId = '1012283755'; // Replace with the actual playlist ID
    const accessToken = '2-294407--wkw13IORLtLcYgUZb87zdkd'; // Replace with the actual access token

    const soundCloudEndpoint = `https://api.soundcloud.com/users/${playlistId}/tracks`;

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

router.get('/:id', async (req, res) => {
  try {
     const accessToken = '2-294407--wkw13IORLtLcYgUZb87zdkd'; // Replace with the actual access token
 
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
