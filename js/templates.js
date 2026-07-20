function getControllsDialogTemplate() {
  return `
<header>
        <h2><img class="button__img" src="./assets/icons/controlls.svg" alt="">CONTROLLS</h2>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Controll</th>
              <th>Key First</th>
              <th>Key Second</th>
            </tr>
          </thead>
          <tr>
            <td>Jump</td>
            <td><span class="key key--letter">W</span></td>
            <td><span class="key key--arrow"><img class="key__icon key__icon--up" src="./assets/icons/arrow.png" alt="Pfeiltaste hoch"></span></td>
          </tr>
          <tr>
            <td>Walk Left</td>
            <td><span class="key key--letter">A</span></td>
            <td><span class="key key--arrow"><img class="key__icon key__icon--left" src="./assets/icons/arrow.png" alt="Pfeiltaste links"></span></td>
          </tr>
          <tr>
            <td>Walk Right</td>
            <td><span class="key key--letter">D</span></td>
            <td><span class="key key--arrow"><img class="key__icon key__icon--right" src="./assets/icons/arrow.png" alt="Pfeiltaste rechts"></span></td>
          </tr>
          <tr>
            <td>Attack</td>
            <td><span class="key key--letter">S</span></td>
            <td><span class="key key--arrow"><img class="key__icon key__icon--down" src="./assets/icons/arrow.png" alt="Pfeiltaste runter"></span></td>
          </tr>
        </table>
      </main>      
`
}

function getSettingsDialogTemplate() {
  return `
<header>
        <h2><img class="button__img" src="./assets/icons/settings.svg" alt="">SETTINGS</h2>
      </header>
      <main>
        <div class="settings__row">
          <span class="settings__label">Sound</span>
          <button class="button button__toggle" onclick="toggleMute()">
            <img class="icon-mute settings__icon" src="${soundManager.muted ? './assets/icons/sound_off.svg' : './assets/icons/sound_on.svg'}" alt="">
          </button>
        </div>
        <div class="settings__row">
          <span class="settings__label">Vollbild</span>
          <button class="button button__toggle" onclick="toggleFullscreen()">
            <img class="settings__icon" src="./assets/icons/fullscreen.png" alt="">
          </button>
        </div>
        <div class="settings__slider">
          <div class="settings__row">
            <span class="settings__label">Musik</span>
            <button class="button button__toggle" onclick="soundManager.toggleMusicMute()">
              <img class="icon-music-mute settings__icon" src="${soundManager.musicMuted ? './assets/icons/sound_off.svg' : './assets/icons/sound_on.svg'}" alt="">
            </button>
          </div>
          <input type="range" class="settings__range" min="0" max="1" step="0.05"
            value="${soundManager.musicVolume}" oninput="soundManager.setMusicVolume(this.value)">
        </div>
        <div class="settings__slider">
          <div class="settings__row">
            <span class="settings__label">Effekte</span>
            <button class="button button__toggle" onclick="soundManager.toggleSfxMute()">
              <img class="icon-sfx-mute settings__icon" src="${soundManager.sfxMuted ? './assets/icons/sound_off.svg' : './assets/icons/sound_on.svg'}" alt="">
            </button>
          </div>
          <input type="range" class="settings__range" min="0" max="1" step="0.05"
            value="${soundManager.sfxVolume}" oninput="soundManager.setSfxVolume(this.value)">
        </div>
        ${world && !world.stopped ? `
        <div class="settings__row">
          <button class="button" onclick="restartFromSettings()">RESTART</button>
          <button class="button" onclick="goHomeFromSettings()">HOME</button>
        </div>` : ''}
        <a href="impressum.html" class="button button__impressum-settings">IMPRESSUM</a>
      </main>
`
}

function getImpressumsDialogTemplate() {
  return `
      <header class="impressum__header">
        <h2>IMPRESSUM</h2>
      </header>
      <main class="impressum__main">
        <div
          style="min-width: 70vh;max-width: 80vh; min-height: 70vh; max-height: 80vh; border: 8px solid #7c5e25; background-color: #cc942b; border-radius: 8px;">

        </div>
        <div>
          <h3>
            EL POLLO LOCO <br>
            by <br>
            Matthias Tausch
          </h3>
        </div>
        </main>
      <footer class="impressum__footer" style="text-align: center;">
        
      </footer>
    `
}