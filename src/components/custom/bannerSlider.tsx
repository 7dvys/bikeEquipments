import React, { useEffect, useRef, useState } from "react"

const heroBanners = [
    <h1 className="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-10 font-heading dark:text-gray-200">
        Tu principal proveedor de repuestos, indumentaria y equipamiento para motos.
    </h1>,
]

export const Banner:React.FC<{bannersUrls:string[]}> = ({bannersUrls})=>{
    const [bannerIndex,setBannerIndex] = useState(0);
    const mouseOver = useRef(false);

    const banners:React.ReactElement[] = bannersUrls.map(bannerUrl=><img src={bannerUrl}/>)
    const bannersWithHeros:React.ReactElement[] = [...heroBanners,...banners];

    useEffect(()=>{
        const counterInterval = setInterval(()=>{
            setBannerIndex(bannerIndex=>{
                if(mouseOver.current)
                return bannerIndex;

                return (bannerIndex === bannersWithHeros.length-1)?0:bannerIndex+1;
            })
        },3500)

        return ()=>{
            clearInterval(counterInterval);
        }
    },[])

    const mouseEvents = {
        enter:()=>{mouseOver.current = true},
        leave:()=>{mouseOver.current = false}
    }


    return (
        <div onMouseEnter={mouseEvents.enter} onMouseLeave={mouseEvents.leave} className="min-h-32 ">
            {bannersWithHeros[bannerIndex]}
        </div>
    )
}