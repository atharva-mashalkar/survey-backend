const imageThumbnail = require('image-thumbnail');
const download = require('image-downloader')
const fs = require('fs');

exports.createThumbnail = async (url) => {
    if (url === undefined) {
        return { success: false, status: 400, error: "Bad Request" }
    }
    var thumbnail;
    
    //Options for creating thumbnails
    const options = { width: 50, height: 50, responseType: 'base64' }

    //Options for downloading image from the url
    const downloadOptions = {
        url,
        dest: './',
    }
    try {

        //Downloading the image from the url and saving it locally
        let { filename } = await download.image(downloadOptions)

        //Creating thumbnail by fetchinf the image locally and storing it in base64 format in a variable 
        thumbnail = await imageThumbnail(filename, options );

        //Deleting the locally stored image
        fs.unlink(filename,(err) => {
            if(err){
                console.log(error)
            }else{
                console.log("Image file deleted")
            }
        })
    } catch (err) {
        console.error(err);
        return { error, success: false, status: 500 }
    }
    return { url,thumbnail, error: null, success: true, status: 200 }
}