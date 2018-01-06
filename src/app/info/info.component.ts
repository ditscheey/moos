import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  wohnraum = "Das Studio mit eigener Terrasse liegt am Ortsrand von Murnau-Hechendorf und man hat einen traumhaften Blick ins Moos und zum Heimgarten, ideal für alle, die gerne wandern, Fahrrad fahren, Berg steigen oder einfach mal ausspannen möchten.";
  zugang = "Es hat einen separaten Eingang, der durch unseren Garten führt. Ein Stellplatz ist vorhanden und die Wiese vor dem Haus kann gerne zum Sonnen und Relaxen genutzt werden.";
  gallerie = "Die Galerie mit den zwei Betten (80 cm und 90 cm) erreicht man wie abgebildet über eine Leiter. Wer das nicht mag, kann unten das Sofa in ein Bett verwandeln. In der Wohnung gibt es eine Nespressomaschine, einer Wasserkocher, Kaffeefilter, Thermoskanne und Teekanne.";
  markt = " erhebt pro Person einen Kurbeitrag von 1,50 € in der Hauptsaison (15.04.-14.10) und 1,10 € in der Nebensaison. Dafür erhält jeder Gast eine elektronische Gästekarte und damit verbunden günstigere Eintrittspreise in Museen, Bäder usw., kostenloses Parken auf vielen gebührenpflichtigen Parkplätzen im Blauen Land und in den Ammergauer Alpen. Die meisten Buslinien im Landkreis sind in Verbindung mit der Karte ebenfalls kostenlos.";

  nachbarschaft = 'In Hechendorf selbst ist ein netter Biergarten (200 m). In zwei Minuten ist man im Munauer Moos, abseits der Straße, entlag der Loisach mit Blick auf die Zugspitze kann bis nach Garmisch radeln.\n' +
    '\n' +
    'Mein Lieblingsort ist die Wirtschaft auf dem Gipfel vom Heimgarten, man hat dort einen gigantischen Blick. Hoch geht es von Ohlstadt (4 km) aus, man braucht etwa zwei Stunden. Wer es lieber fauler mag, legt sich an den Staffel-, Rieg- oder Froschsee. Radlfans fahren durch das Eschenlainetal bis zum Walchensee. Danach kann man noch nach Murnau in die Fußgängerzone fahren und sich ein Eis beim Gabrielli holen. Sagenhaft! Den schönsten Blick hat man vom Biergarten in Uffing direkt am Staffelsee'

  lat: number = 47.66332;
  lng: number = 11.20835;

  constructor() { }

  ngOnInit() {
  }

}
