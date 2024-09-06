import PrimarySearchAppBar from "../components/PrimarySearchAppBar"

 
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
      <PrimarySearchAppBar/>
        <main>{children}</main>
      </>
    )
  }