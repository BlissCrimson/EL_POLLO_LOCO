class SoundManager {
    sounds = [];
    muted = false;

    registerSound(path) {
        let sound = new Audio(path);
        // TODO: sound zum Array hinzufügen
        // TODO: sound.muted auf aktuellen this.muted-Status setzen
        return sound;
    }

    toggleMute() {
        // TODO: this.muted umkehren
        this.muted = !this.muted;
        // TODO: über alle sounds iterieren und muted setzen
        this.sounds.forEach(sound => {
            sound.muted = this.muted;
        })
        // TODO: Status im localStorage speichern
        localStorage.setItem('muted', this.muted);
    }

    loadMuteState() {
        // TODO: aus localStorage lesen und anwenden
        this.muted = localStorage.getItem('muted') === 'true';
    }
}