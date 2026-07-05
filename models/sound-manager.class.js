class SoundManager {
    sounds = [];
    muted = false;

    registerSound(path) {
        let sound = new Audio(path);
        this.sounds.push(sound);
        sound.muted = this.muted;
        return sound;
    }

    toggleMute() {
        this.muted = !this.muted;
        // TODO: über alle sounds iterieren und muted setzen
        this.sounds.forEach(sound => {
            sound.muted = this.muted;
        })
        localStorage.setItem('muted', this.muted);
        this.toggleMuteIcon();
    }

    loadMuteState() {
        this.muted = localStorage.getItem('muted') === 'true';
    }

    toggleMuteIcon() {
        const muteIcon = document.getElementById('muteIcon');
        if (this.muted) {
            muteIcon.src = './assets/icons/sound_off.svg';
        }
        if (!this.muted) {
            muteIcon.src = './assets/icons/sound_on.svg';
        }
    }
}