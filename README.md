# Guia "Os Objetos e Suas Narrativas"

A Cordova app for Android: an accessible multimedia guide to a museum exhibition, offering audio description (Audiodescrição) and Brazilian Sign Language (LIBRAS) video for each object.

Developed between December 2020 and January 2021 for the exhibition "Os objetos e suas narrativas" at the Museu de Folclore Edison Carneiro (CNFCP). This repository holds the app's code only: the audio, video and photographs produced for the exhibition, and the credits page, are not included.

## What it does

- **Home** (`index.html`) has three entries: "Tutorial de Audiodescrição", "Entrar na sessão Audiodescrição" and "Entrar na sessão LIBRAS". There is also an exit button and a link to the app credits.
- **Audiodescrição session** (`sessaoAD.html` → `subAreaAD.html` / `areaAD.html`):
  - The exhibition areas are grouped by floor (`pavimento` 1 and 2) and listed from `dist/js/obrasAD.json`: 10 areas and about 275 audio tracks.
  - Navigation is built for blind and low-vision visitors. The first tap on a button plays a recorded audio label ("btn_voltar", "btn_proxima_area", the area name). The second tap activates it.
  - Each object has its own audio player.
- **LIBRAS session** (`sessaoLibras.html` → `subAreaLibras.html` / `areaLibras.html`):
  - The same areas, loaded from `dist/js/obrasLibras.json`: 9 areas and about 267 entries.
  - Each area has an introduction video, and each object has a sign-language video with a poster frame.
- **Deep links between pages** use query parameters (`indexArea`, `hash`) and `history.replaceState`, so the back button returns to the same sub-area.

All content is local. The app makes no network requests apart from loading Font Awesome and Ionicons stylesheets from cdnjs.

## Tech stack

- Apache Cordova with `cordova-android` ^9.0.0 and `cordova-plugin-whitelist` ^1.3.4. Android minimum and target SDK are both 22 (`config.xml`).
- HTML, CSS and JavaScript (no framework). jQuery 2.2.3.
- The AdminLTE 2.3.8 admin template (MIT) on Bootstrap 3, used for layout and styling. The template's whole `plugins/` folder and LESS sources were committed, although only a few files are used.
- Content: JSON catalogues in `www/dist/js/`. The MP3 audio-description tracks and MP4 LIBRAS videos are not included.

## Running locally

- **In a browser**: serve `www/` with any static server (for example `npx http-server www`) and open `index.html`. The pages call `app.onDeviceReady()` on `window.onload`, so they work without Cordova. The "SAIR" (exit) button needs Cordova's `navigator.app`, and the request for `cordova.js` returns 404 in a plain browser.
- **As an Android app**: `npm install`, then `npx cordova platform add android` and `npx cordova build android`. This needs the Android SDK and a JDK version that cordova-android 9 supports. `platforms/` and `plugins/` are git-ignored, apart from the whitelist plugin that is committed.

Without the media files, the pages and navigation work but the audio and video players have nothing to play.

## Project structure

```
config.xml               Cordova app config (id, name, icons, SDK levels)
package.json             Cordova platform/plugin versions
www/
  index.html             home
  sessao*.html           session entry (AD / LIBRAS): list of areas by floor
  subArea*.html          area intro + list of sub-areas
  area*.html             objects of an area with their audio / video
  dist/js/               page scripts + obrasAD.json / obrasLibras.json catalogues
  dist/css, bootstrap/,
  plugins/, build/       AdminLTE template files
```

## Notes

- No tests and no build pipeline beyond Cordova.
- `package.json` still has the Cordova sample description ("A sample Apache Cordova application...") and the author "Apache Cordova Team".
- The page scripts keep the Cordova sample's Apache license header and `app` object.
- Unused AdminLTE material (demo scripts, many plugins) is still in `www/`.
- The audio, video and photographs were produced for the museum and its partners, so they are not part of this repository. The catalogues and pages still reference their file names, and the home page still links to the removed credits page.
