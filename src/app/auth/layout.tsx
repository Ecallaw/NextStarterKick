
export default function authLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="absolute top-0 left-0 flex flex-col h-screen w-full bg-black">
      {children}
    </main>
  )
}