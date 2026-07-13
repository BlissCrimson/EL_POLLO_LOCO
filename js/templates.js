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
            <td>W</td>
            <td>UP</td>
          </tr>
          <tr>
            <td>Walk Left</td>
            <td>A</td>
            <td>LEFT</td>
          </tr>
          <tr>
            <td>Walk Right</td>
            <td>D</td>
            <td>Right</td>
          </tr>
          <tr>
            <td>Attack</td>
            <td>S</td>
            <td>Down</td>
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