import MainMenuPanel from '@/components/mainMenuPanel/MainMenuPanel.js'



const HomePage = (props) => {
    return ( 
    <>
        {props.children}
        <MainMenuPanel/>
    </> );
}
 
export default HomePage;
