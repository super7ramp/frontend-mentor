import MenuBar from "../components/MenuBar.jsx";

function Layout({toolbar, mainContent}) {
    return (
        <>
            <header>
                <MenuBar/>
            </header>
            <main>
                {toolbar}
                {mainContent}
            </main>
        </>
    )
}

export default Layout
