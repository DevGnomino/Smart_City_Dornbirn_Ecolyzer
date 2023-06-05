import React from 'react';
import Foto_Damiano from './../icons/Foto_Damiano.jpg';
import Foto_Martin from './../icons/Foto_Martin.jpg';

export default function About() {
    return (
        <div className="w-screen mt-32 pb-4 pt-0">
            <div className="bg-gradient-to-b from-white from-50% to-transparent to-100% px-5 h-16 w-full fixed z-10">
                <h2 className="font-bold w-fit text-xl text-green-800 border-b-4 border-green-800">About us</h2>
                <br />
            </div>
            <div className="px-5 relative top-12 z-0">
                <div>
                    <p>Willkommen bei Ecolyzer – Deinem Weg zu einem stressfreien und umweltbewussten Pendeln!</p>
                    <br />
                    <p>Ecolyzer ist eine innovative Web-App, die entwickelt wurde, um Menschen zu helfen, ihre täglichen Pendelzeiten zu optimieren und die Umweltbelastung in ihrer Stadt zu reduzieren. Unser revolutionäres System nutzt fortschrittliche Technologien wie OpenCV und künstliche Intelligenz, um genaue Verkehrsdaten zu erfassen und daraus wichtige Umweltfaktoren abzuleiten.</p>
                    <br />
                    <p>Wie funktioniert Ecolyzer? An strategischen Standorten entlang der Verkehrswege haben wir kleine Boxen installiert, die mit Kameras ausgestattet sind. Diese Boxen nehmen kontinuierlich Bilder auf, die dann direkt vor Ort von einem Raspberry Pi ausgewertet werden. Mithilfe unserer intelligenten Algorithmen zählt der Mikrocontroller die Anzahl der vorbeifahrenden Autos, Zweiräder und Busse und speichert diese Daten sicher in einer Influx-Datenbank. Die Bilddaten werden selbstverständlich sofort gelöscht, um die Privatsphäre der Verkehrsteilnehmer zu wahren.</p>
                    <br />
                    <p>Die gesammelten Verkehrsdaten sind über diese benutzerfreundliche und simple Website zugänglich. Hier kannst du die aktuellen Verkehrsbelastungen in Echtzeit verfolgen und auf einer übersichtlichen Karte von Dornbirn die Verkehrshotspots erkennen. Dank unserer intuitiven Heatmap-Funktion kannst du schnell und einfach die stark befahrenen Straßen identifizieren und alternative Routen planen, um Staus und Verzögerungen zu vermeiden. Unser Ziel ist es, dir einen entspannten Weg zu deinem Ziel zu ermöglichen, ohne dass du dich übermäßig ärgern musst oder unter dem Druck des Verkehrs leidest.</p>
                    <br />
                    <p>Aber das ist noch nicht alles! Ecolyzer geht über die Verkehrsanalyse hinaus. Unsere Boxen messen auch Umweltfaktoren wie die Temperatur und Luftfeuchtigkeit an den Messorten. Dadurch können wir Schadstoffbelastungen abschätzen und somit einen Beitrag zu einer saubereren und gesünderen Umwelt leisten. Wir möchten sicherstellen, dass auch die nächsten Generationen in einer lebenswerten und nachhaltigen Welt aufwachsen können.</p>
                    <br />
                    <p>Ecolyzer ist ein Gemeinschaftsprojekt, das von den HTL-Dornbirn-Schülern Martin Schneider und Damiano Pezzè entwickelt wurde.</p>
                    <br />
                </div>
                <div className='flex w-full justify-center lg:justify-start align-middle p-6'>
                    <div className='text-center w-56 pr-10'>
                        <p className='text-center font-bold w-full text-l text-green-800'>Damiano Pezzè</p>
                        <br />
                        <img src={Foto_Damiano} alt='Foto von Damiano Pezzè' className='object-cover h-64 w-full border-green-800 border-4 rounded-md' title='Damiano Pezzè'/>
                    </div>
                    <div className='text-center w-56 pl-10'>
                        <p className='text-center font-bold w-full text-l text-green-800'>Martin Schneider</p>
                        <br />
                        <img src={Foto_Martin} alt='Foto von Martin Schneider' className='object-cover h-64 w-full border-green-800 border-4 rounded-md' title='Martin Schneider'/>
                    </div>
                </div>

            </div>
        </div>
    )
}

