
# InvestoFox

[![Status](https://img.shields.io/badge/status-active-success.svg)]() [![GitHub Issues](https://img.shields.io/github/issues/rakenduste-programmeerimine-2021/investofox.svg)](https://github.com/rakenduste-programmeerimine-2021/investofox/issues) [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/rakenduste-programmeerimine-2021/investofox.svg)](https://github.com/rakenduste-programmeerimine-2021/investofox/pulls)
## Autorid
[@Gaspar Luik](github.com/gasparluik)
[@Liisa Mikola](github.com/liismik)
### Sisukord
- [Autorid](#Autorid)
- [Projekt](#Projekt)
- [Funktsionaalsus](#Funktsionaalsus)
- [Installeerimine](#Installeerimisjuhend)
- [Tarkvara](#Tarkvara)
- [Kuvatõmmised](#Kuvatõmmised)

### Projekt
Rakendus on loodud TLÜ Informaatika eriala, rakenduste programmeerimise aineraames. Rakenduse eesmärk on lihtsustada enda investeerimisportfoolio jälgimist, uuendamist, analüüsimist. Märkasime, et paljud portfelli haldamiseks loodud rakendused ei oma mõnda olulist funktsionaalsust, mida meie proovime parandada.

### Funktsionaalsus
- Kasutaja saab end registreerida ning sisse logida.
- Kasutaja saab lisada tehingu
- Tehinguid saab vaadata, ning kustutada.
- Portfelli ülevaadet saab näha graafikul ning näitajate näol
- Kasutaja saab enda kasutaja andmeid muuta
#### Kui jõuame
- Sisselogimine Googleiga
- Tehinguid saab muuta
- Portfelli Year-Over-Year muutus, parim tehing, halvim tehing jne
- Investeerimiseesmärkide märkimine

### Installeerimisjuhend

- Lae alla [Docker](https://docker.com)
- Klooni repo
- Ava docker siin kloonitud kaustas local-dev, käsuga:
 ```sh
cd local-dev
docker compose-up -d
```
### Tarkvara

- [Reactjs](https://reactjs.com) - Javascript framework
- [Node.js](node.js) - Backendiks Node.js
- [Express](https://www.npmjs.com/package/express) - fast node.js network app framework
- [MongoDB](https://www.mongodb.com/) - Andmebaas
---
### Wireframe
[Figma](https://www.figma.com/file/oj0dggGEE0yHlKxfRBSrm4/InvestoFox?node-id=0%3A1)

### Kuvatõmmised
Your orders:
![image](https://user-images.githubusercontent.com/70939487/146443830-6e79dccd-23d8-4a23-9fd6-c2bf4cac4770.png)

Add orders:
![image](https://user-images.githubusercontent.com/70939487/146443895-2e683f4d-bc53-4840-9f79-c3c11c29cab0.png)

Chart:
![image](https://user-images.githubusercontent.com/70939487/146673081-15256395-8289-430f-b68f-b821aa4179a7.png)

Get info on one stock:
![image](https://user-images.githubusercontent.com/70939487/148220451-b7acb38e-1715-4bc1-a080-d2ee16ee9d0a.png)


