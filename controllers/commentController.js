

const iconv = require('iconv-lite');
const express = require("express");



const router = express.Router();




const parseString = require('xml2js').parseString;

const axios = require('axios');



router.route("").get( async (req,res) =>{


  res.json({ username: 'Flavio' })
})



 const decode = (content)=> {
  var iconv = new Iconv('CP1255', 'UTF-8//TRANSLIT//IGNORE');
  var buffer = iconv.convert(content);
  return buffer.toString('win1255');
};

router.route("/rotter2").get( async (req,res) =>{
  const url = "https://rotter.net/forum/scoops1/754610.shtml"
  const data = await axios({
    url:url,
    method:"get",



    
  })


  console.log(data)
  })


  router.route('/m3u').get(async (req, res) => {
    try {
      const url = 'https://ideorpo.alwaysdata.net/kmb.php';
      const response = await axios.get(url);
  
      // Set the proper headers to indicate that the response is an M3U8 file
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
  
      // Split the response data into lines
      const lines = response.data.split('\n');
  
      let lastM3U8Url = '';
      
      lines.forEach(line => {
        if(line.includes('.m3u8')) {
          lastM3U8Url = line; // store the last m3u8 url
        }
      });
  
      // send only the last m3u8 url
      res.send(lastM3U8Url);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  


String.prototype.replaceArray = function(find, replace) {
  var chacking = ""
  var replaceString = this;
  for (var i = 0; i < find.length; i++) {
    replaceString = replaceString.replace(find[i], replace[i]);
    chacking+=replaceString +"\n"
  }

  //return chacking
  return replaceString;
};
  


router.route("/rotter").get( async (req,res) =>{

  let D = new Date(Date.now());
  let formattedDate = `${D.getDate().toString().padStart(2, '0')}/${(D.getMonth() + 1).toString().padStart(2, '0')}/${D.getFullYear().toString().substr(-2)} ${D.getHours().toString().padStart(2, '0')}:${D.getMinutes().toString().padStart(2, '0')}:${D.getSeconds().toString().padStart(2, '0')}`;
  
  try{

 
    const xml = await axios({
      url: "https://rotter.net/rss/rotternews.xml",
      responseType: 'arraybuffer',
    });
    
    const xmlString = iconv.decode(xml.data, 'windows-1255');
    
    console.log("Before ");
    console.log(xmlString);
    console.log("last connection to server: \n" + formattedDate );
    let finalXML = xmlString;
    
    return res.send(finalXML);
}

catch(err)
{console.log("Error: ");
console.log(err);

  res.send(err)
}

})

module.exports = router;
