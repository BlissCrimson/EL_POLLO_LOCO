/**
 * Manages loading, muting and volume control for all music and sound
 * effects, and persists the settings in local storage.
 */
class SoundManager {
    musicSounds = [];
    sfxSounds = [];
    muted = false;
    musicMuted = false;
    sfxMuted = false;
    musicVolume = 0.5;
    sfxVolume = 1;

    /**
     * Creates and registers a new sound, applying the current mute/volume
     * state for its type.
     * @param {string} path - Path to the audio file.
     * @param {string} [type='sfx'] - 'music' or 'sfx'.
     * @returns {HTMLAudioElement} The created audio element.
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

    /**
     * Applies the current mute and volume settings to a single sound.
     * @param {HTMLAudioElement} sound - The sound to update.
     * @param {string} type - 'music' or 'sfx'.
     */
    updateSound(sound, type) {
        if (type === 'music') {
            sound.muted = this.muted || this.musicMuted;
            sound.volume = this.musicVolume;
        } else {
            sound.muted = this.muted || this.sfxMuted;
            sound.volume = this.sfxVolume;
        }
    }

    /**
     * Applies the current mute and volume settings to all registered sounds.
     */
    updateAllSounds() {
        this.musicSounds.forEach(sound => this.updateSound(sound, 'music'));
        this.sfxSounds.forEach(sound => this.updateSound(sound, 'sfx'));
    }

    /**
     * Toggles muting all sounds and saves the state to local storage.
     */
    toggleMute() {
        this.muted = !this.muted;
        this.updateAllSounds();
        localStorage.setItem('muted', this.muted);
        this.toggleMuteIcon();
    }

    /**
     * Toggles muting music only and saves the state to local storage.
     */
    toggleMusicMute() {
        this.musicMuted = !this.musicMuted;
        this.updateAllSounds();
        localStorage.setItem('musicMuted', this.musicMuted);
        this.toggleMusicMuteIcon();
    }

    /**
     * Toggles muting sound effects only and saves the state to local storage.
     */
    toggleSfxMute() {
        this.sfxMuted = !this.sfxMuted;
        this.updateAllSounds();
        localStorage.setItem('sfxMuted', this.sfxMuted);
        this.toggleSfxMuteIcon();
    }

    /**
     * Sets the music volume and saves it to local storage.
     * @param {string|number} value - New volume between 0 and 1.
     */
    setMusicVolume(value) {
        this.musicVolume = parseFloat(value);
        this.updateAllSounds();
        localStorage.setItem('musicVolume', this.musicVolume);
    }

    /**
     * Sets the sound effects volume and saves it to local storage.
     * @param {string|number} value - New volume between 0 and 1.
     */
    setSfxVolume(value) {
        this.sfxVolume = parseFloat(value);
        this.updateAllSounds();
        localStorage.setItem('sfxVolume', this.sfxVolume);
    }

    /**
     * Loads all mute states and volumes from local storage and applies them.
     */
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

    /**
     * Updates all mute-icon elements to reflect the current mute state.
     */
    toggleMuteIcon() {
        document.querySelectorAll('.icon-mute').forEach(icon => {
            icon.src = this.muted ? '../assets/icons/sound_off.svg' : '../assets/icons/sound_on.svg';
        });
    }

    /**
     * Updates all music-mute-icon elements to reflect the current state.
     */
    toggleMusicMuteIcon() {
        document.querySelectorAll('.icon-music-mute').forEach(icon => {
            icon.src = this.musicMuted ? '../assets/icons/sound_off.svg' : '../assets/icons/sound_on.svg';
        });
    }

    /**
     * Updates all sfx-mute-icon elements to reflect the current state.
     */
    toggleSfxMuteIcon() {
        document.querySelectorAll('.icon-sfx-mute').forEach(icon => {
            icon.src = this.sfxMuted ? '../assets/icons/sound_off.svg' : '../assets/icons/sound_on.svg';
        });
    }
}