import MenuBar from "../components/MenuBar.jsx";

function Layout({main}) {
    return (
        <>
            <header>
                <MenuBar/>
            </header>
            <main>
                {main}
            </main>
        </>
    )
}

export default Layout
