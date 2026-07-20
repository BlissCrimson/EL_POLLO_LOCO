class SoundManager {
    musicSounds = [];
    sfxSounds = [];
    muted = false;
    musicMuted = false;
    sfxMuted = false;
    musicVolume = 0.5;
    sfxVolume = 1;

    /**
     * @param {string} path
     * @param {string} type - 'music' or 'sfx' (Standard)
     */
    registerSound(path, type = 'sfx') {
        let sound = new Audio(path);
        if (type === 'music') {
            this.musicSounds.push(sound);
        } else {
            this.sfxSounds.push(sound);
        }
        this.updateSound(sound, type);
        return sound;
    }

    updateSound(sound, type) {
        if (type === 'music') {
            sound.muted = this.muted || this.musicMuted;
            sound.volume = this.musicVolume;
        } else {
            sound.muted = this.muted || this.sfxMuted;
            sound.volume = this.sfxVolume;
        }
    }

    updateAllSounds() {
        this.musicSounds.forEach(sound => this.updateSound(sound, 'music'));
        this.sfxSounds.forEach(sound => this.updateSound(sound, 'sfx'));
    }

    toggleMute() {
        this.muted = !this.muted;
        this.updateAllSounds();
        localStorage.setItem('muted', this.muted);
        this.toggleMuteIcon();
    }

    toggleMusicMute() {
        this.musicMuted = !this.musicMuted;
        this.updateAllSounds();
        localStorage.setItem('musicMuted', this.musicMuted);
        this.toggleMusicMuteIcon();
    }

    toggleSfxMute() {
        this.sfxMuted = !this.sfxMuted;
        this.updateAllSounds();
        localStorage.setItem('sfxMuted', this.sfxMuted);
        this.toggleSfxMuteIcon();
    }

    setMusicVolume(value) {
        this.musicVolume = parseFloat(value);
        this.updateAllSounds();
        localStorage.setItem('musicVolume', this.musicVolume);
    }

    setSfxVolume(value) {
        this.sfxVolume = parseFloat(value);
        this.updateAllSounds();
        localStorage.setItem('sfxVolume', this.sfxVolume);
    }

    loadMuteState() {
        this.muted = localStorage.getItem('muted') === 'true';
        this.musicMuted = localStorage.getItem('musicMuted') === 'true';
        this.sfxMuted = localStorage.getItem('sfxMuted') === 'true';
        this.musicVolume = localStorage.getItem('musicVolume') !== null
            ? parseFloat(localStorage.getItem('musicVolume')) : 1;
        this.sfxVolume = localStorage.getItem('sfxVolume') !== null
            ? parseFloat(localStorage.getItem('sfxVolume')) : 1;
        this.updateAllSounds();
        this.toggleMuteIcon();
        this.toggleMusicMuteIcon();
        this.toggleSfxMuteIcon();
    }

    toggleMuteIcon() {
        document.querySelectorAll('.icon-mute').forEach(icon => {
            icon.src = this.muted ? './assets/icons/sound_off.svg' : './assets/icons/sound_on.svg';
        });
    }

    toggleMusicMuteIcon() {
        document.querySelectorAll('.icon-music-mute').forEach(icon => {
            icon.src = this.musicMuted ? './assets/icons/sound_off.svg' : './assets/icons/sound_on.svg';
        });
    }

    toggleSfxMuteIcon() {
        document.querySelectorAll('.icon-sfx-mute').forEach(icon => {
            icon.src = this.sfxMuted ? './assets/icons/sound_off.svg' : './assets/icons/sound_on.svg';
        });
    }
}