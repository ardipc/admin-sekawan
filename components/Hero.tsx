export default function Hero(){
    return(
    <div className="hero" style={{backgroundImage: 'url(/images/hero-ku.png)'}}>
        <div className="hero-overlay bg-opacity-0"></div>
            <div className="hero-content text-center text-neutral-content">
            <div className="max-w-2xl mt-8 mb-16">
                <h1 className="mb-5 text-5xl font-bold dark:text-white tracking-normal leading-normal">Jakarta International <br/>Stadium</h1>
                <p className="mb-5 h-16 text-lg font-medium dark:text-white">Jakarta International Stadium (Indonesian: Stadion Internasional Jakarta) 
                <br/>is a retractable roof football stadium in Tanjung Priok, Jakarta, Indonesia.</p>
            </div>
        </div>
    </div>
    )
}