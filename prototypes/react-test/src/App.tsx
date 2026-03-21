import type {JSX} from "react";
import {News} from "./About/News.tsx";
import {Pictures} from "./pictures/Pictures.tsx";
import {Header} from "./header/Header.tsx";

function App(): JSX.Element {
    const images = [
        "jonathangaessler_Pressebilder/2024_03_22_purple_noise_choir_1.jpg",
        "jonathangaessler_Pressebilder/2024_03_22_purple_noise_choir_2.jpg",
        "jonathangaessler_Pressebilder/2024_03_22_purple_noise_choir_3.jpg",
        "jonathangaessler_Pressebilder/2024_03_22_purple_noise_choir_4.jpg",
        "jonathangaessler_Pressebilder/2024_03_22_purple_noise_choir_5.jpg",
        "jonathangaessler_Pressebilder/2024_03_22_purple_noise_choir_6.jpg",
        "jonathangaessler_Total_Choral_25.04.2024/2024_04_25_purplenoisechoir_1.jpg",
        "jonathangaessler_Total_Choral_25.04.2024/2024_04_25_purplenoisechoir_2.jpg",
        "jonathangaessler_Total_Choral_25.04.2024/2024_04_25_purplenoisechoir_3.jpg",
        "jonathangaessler_Total_Choral_25.04.2024/2024_04_25_purplenoisechoir_4.jpg",
        "jonathangaessler_Total_Choral_25.04.2024/2024_04_25_purplenoisechoir_5.jpg",
        "jonathangaessler_Total_Choral_25.04.2024/2024_04_25_purplenoisechoir_6.jpg",
    ]
    return (
        <div className="App">
            <Header/>
            <Pictures images={images} interval={7000}/>
            <News/>
        </div>
    )
}

export default App
