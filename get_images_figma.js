const axios = require ('axios')
const https = require('https')
const fs = require('fs');
const url = 'Your URL here (usually something like: https://api.figma.com/v1/files/<FILE_ID_HERE>/images'
const token = 'Your Token (Go to profile settings to get yours)'

async function main(){
let a = await axios({
    method :'get',
    url: url,
    headers: { 'X-Figma-Token': `${token}`,}
        })
let b = a.data.meta.images
let array = []

    for (key in b){
        array.push(b[key])
    }


for(i=0;i<=array.length-1;i++){
    https.get(array[i],(res) =>{ 
        const path = `images/img${i--}.svg`
        const filePath = fs.createWriteStream(path)
    res.pipe(filePath)
    filePath.on('finish',()=>{
        filePath.close()
        console.log('successful download',i)
                     })

             })
    }   

}

main()