/**
 * Manages loading, muting and volume control for all music and sound
 * effects, and persists the settings in local storage.
 */
class SoundManager {
    musicSounds = [];
    sfxSounds = [];
    musicMuted = false;
    sfxMuted = false;
    musicVolume = 0.5;
    sfxVolume = 0.5;

    /**
     * Creates and registers a new sound, applying the current mute/volume
     * state for its type.
     * @param {string} path - Path to the audio file.
     * @param {string} [type='sfx'] - 'music' or 'sfx'.
     * @param {number} [volumeFactor=1] - Multiplier on top of the group volume.
     * @returns {HTMLAudioElement} The created audio element.
     */
    registerSound(path, type = 'sfx', volumeFactor = 1) {
        let sound = new Audio(path);
        sound.volumeFactor = volumeFactor;
        if (type === 'music') {
            this.musicSounds.push(sound);
        } else {
            this.sfxSounds.push(sound);
        }
        this.updateSound(sound, type);
        return sound;
    }

    /**
     * Applies the current mute and volume settings to a single sound,
     * scaled by the sound's own volume factor.
     * @param {HTMLAudioElement} sound - The sound to update.
     * @param {string} type - 'music' or 'sfx'.
     */
    updateSound(sound, type) {
        const factor = sound.volumeFactor ?? 1;
        if (type === 'music') {
            sound.muted = this.musicMuted;
            sound.volume = this.musicVolume * factor;
        } else {
            sound.muted = this.sfxMuted;
            sound.volume = this.sfxVolume * factor;
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
        const target = !(this.musicMuted && this.sfxMuted);
        this.musicMuted = target;
        this.sfxMuted = target;
        this.updateAllSounds();
        localStorage.setItem('musicMuted', this.musicMuted);
        localStorage.setItem('sfxMuted', this.sfxMuted);
        this.toggleMuteIcon();
        this.toggleMusicMuteIcon();
        this.toggleSfxMuteIcon();
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
        this.musicMuted = localStorage.getItem('musicMuted') === 'true';
        this.sfxMuted = localStorage.getItem('sfxMuted') === 'true';
        this.musicVolume = localStorage.getItem('musicVolume') !== null
            ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
        this.sfxVolume = localStorage.getItem('sfxVolume') !== null
            ? parseFloat(localStorage.getItem('sfxVolume')) : 0.5;
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
            icon.src = (this.musicMuted && this.sfxMuted) ? '../assets/icons/sound_off.svg' : '../assets/icons/sound_on.svg';
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

    /**
     * Stops and resets all registered SFX sounds. Music is left untouched.
     */
    stopAllSounds() {
        this.sfxSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}