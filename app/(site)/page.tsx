import getSongs from "@/action/getSongs"
import Header from "@/components/Header"
import ListItem from "@/components/ListItem"
import PageContent from "./components/PageContent"

//This page has always up to date
const revalidate = 60
////

export default async function Home() {
  // after create action/getSong.ts
  const songs = await getSongs()

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-x-hidden overflow-y-auto ">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back!</h1>
          <div className="grid grid-cols-1 sm:grid-col-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  )
}
