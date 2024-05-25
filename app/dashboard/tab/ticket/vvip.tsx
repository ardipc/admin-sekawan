export default function sVvip(){
    return(
        <>
        <div className="p-4">
            <div className="flex justify-between">
                <div>
                    <p>Price</p>
                    <p className="text-xl font-bold">Rp 325000</p>
                </div>
                <div className="text-end">
                    <p>Time Remaining</p>
                    <p className="text-xl font-bold">3 Days Before Event</p>
                </div>
            </div>
            <div className="flex gap-2 mt-9">
                <img src="/icons/newsblack.svg" alt="icon" />
                <p className="text-xl font-bold">Ticket</p>
            </div>
            <p className="text-xs font-medium text-end">30 Ticket Left</p>
            <progress className="progress progress-primary w-full mt-4" value="70" max="100"></progress>
            <p className="text-xs font-medium text-center mt-4">70 of 100 Ticket Sold</p>
            <div className="bg-primary mt-9 p-4">
                <p className="text-xs font-medium text-white text-center">Income</p>
                <h1 className="text-5xl font-bold text-white text-center mt-4">Rp 6.500.000</h1>
            </div>
        </div>
        </>
    )
}