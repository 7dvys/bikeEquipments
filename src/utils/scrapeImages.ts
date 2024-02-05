import * as cheerio from 'cheerio';
import sizeOf from 'image-size';
import fetch from 'node-fetch'

const getAllImageSrc = async (baseUrl:string)=>{
    try {
        const response = await fetch(baseUrl);
        const html = await response.text();

        const $ = cheerio.load(html);

        const imageEndpoints:string[] = [];
        $('img').each((_, element) => {
            const imageUrl = $(element).attr('src') as string;
            const fullImageUrl = new URL(imageUrl, baseUrl).href;
            imageEndpoints.push(fullImageUrl);
        });

        return imageEndpoints;
    } catch (error) {
        console.error('Error al obtener los endpoints:', (error as Error).message );
        return [];
    }
}

const getImageSizeFromUrl = async (url:string):Promise<{url:string,width:number,height:number}|undefined> =>{
    const imageBuffer = await fetch(url).then(response =>response.arrayBuffer());
    
    const uint8Array = new Uint8Array(imageBuffer);
    const {width,height} = sizeOf(uint8Array);

    return (width !== undefined && height !== undefined)?{width,height,url}:undefined;
}

export const getImagesUrlFromPages = async (pages:{page:string,filters:string[],folderFilters:string[]}[]):Promise<{photo:string[],banner:string[]}> =>{
    const imagesPromises:Promise<{url:string,isBanner:boolean}[]>[] = pages.map(async ({page,filters,folderFilters})=>{

        const imagesSrc = await getAllImageSrc(page);

        const filteredImagesSrc = imagesSrc.filter(src=>{
            
            const splitedSrc = src.split('/');
            const endpoint = splitedSrc[splitedSrc.length-1];
            
            console.log(splitedSrc)
            
            const notPassFolderFilters = folderFilters.some(folderFilter=>{
                const folders = folderFilter.split('/');

                for(let counter = 0; counter < folders.length;counter++){
                    const srcFolder = splitedSrc[splitedSrc.length-counter-1-1];
                    console.log({srcFolder})
                }
            })
            
            const notPassFilters = filters.some(filter=>endpoint.startsWith(filter))
            return !notPassFilters             
        })

        const imagesSizesPromises = filteredImagesSrc.map(getImageSizeFromUrl);

        const imagesSizes = (await Promise.all(imagesSizesPromises)).filter(imageSize=>imageSize!==undefined) as {
            url: string;
            width: number;
            height: number;
        }[];
        
        const imagesWithSizes = imagesSizes.map(({url,width,height})=>{
            const isBanner = width>=height*2.2;
            return {url,isBanner};
        }) 
        return imagesWithSizes;
    })

    const images = (await Promise.all(imagesPromises)).reduce((acc,pageImages)=>[...acc,...pageImages],[])

    
    const separatedImages = images.reduce((acc,{url,isBanner})=>{
        const key = isBanner?'banner':'photo';
        acc[key] = [...acc[key],url];
        return acc;
    },{photo:[],banner:[]} as {photo:string[],banner:string[]})

    return separatedImages
}


