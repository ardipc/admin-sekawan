import Link from "next/link";

export default function Footer() {
  return (
<footer className="bg-primary">
  <div className="container px-6 py-12 mx-auto">
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-6">
      {
        ['Venues','News','Events','Membership','Contact'].map((item, index) => (
          <div key={`as-${index}`}>
            <h3 className="text-2xl text-white mb-12">{item}</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="#" className="text-white">Infulancers</a>
              <a href="#" className="text-white">CO-Branding</a>
              <a href="#" className="text-white">Affiliate</a>
              <a href="#" className="text-white">Giveaway</a>
              <a href="#" className="text-white">Honor</a>
            </div>
          </div>
        ))
      }
    </div>
    <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
    <div className="flex flex-col items-center justify-between sm:flex-row">
      <p className="mt-4 text-sm text-white sm:mt-0">© Copyright 2023 Inagri. All Rights Reserved.</p>
      <Link href="#" className="mt-4">
        <img className="w-auto h-24" src="/images/logo-foot.png" alt="Gambar" />
      </Link>
    </div>
  </div>
</footer>

  )
}