// const express = require('express');
// const axios = require('axios');
// const Preview = require('../models/preview');

// const router = express.Router();

// router.get('/', async (req, res) => {
//  try {
//     const playlistId = '1012283755'; // Replace with the actual playlist ID
//     const accessToken = '2-294407--R969v7QVRCGyLu0RLEcyCLL'; // Replace with the actual access token

//     const soundCloudEndpoint = `https://api.soundcloud.com/users/${playlistId}/tracks`;

//     // Make the Axios request to SoundCloud API
//     const response = await axios.get(soundCloudEndpoint, {
//       headers: {
//         'accept': 'application/json; charset=utf-8',
//         'Authorization': `OAuth ${accessToken}`
//       }
//     });

//     const soundCloudData = await response.data;

//     res.status(200).json(soundCloudData)

//  } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to retrieve SoundCloud data' });
//  }
// });

// module.exports = router;
