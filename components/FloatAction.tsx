import Link from "next/link";

export default function FloatAction() {
  return (
    <div className="fixed bottom-6 right-9 flex flex-col gap-y-2">
        <div className="tooltip tooltip-left" data-tip="Event">
            <Link href={`/event/now`} className="btn btn-square btn-primary">
                <img src="/icons/icon-event-menu.png" alt="Icon" />
            </Link>
        </div>
        <div className="tooltip tooltip-left" data-tip="Pre Booking">
            <Link href={`/bookfac`} className="btn btn-square btn-primary">
                <img src="/icons/icon-pre-book.png" alt="Icon" />
            </Link>
        </div>
        <div className="tooltip tooltip-left" data-tip="Booking Facilities">
            <Link href={`/bookfac`} className="btn btn-square btn-primary">
                <img src="/icons/icon-book-facilities.png" alt="Icon" />
            </Link>
        </div>
        <div className="tooltip tooltip-left" data-tip="Create Event">
            <Link href={`/bookfac`} className="btn btn-square btn-primary">
                <img src="/icons/icon-create-event.png" alt="Icon" />
            </Link>
        </div>
    </div>
  )
}