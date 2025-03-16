import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    private isDarkMode = false;

    constructor() {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            this.isDarkMode = savedMode === 'true';
        }
        this.applyMode();
    }

    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        this.applyMode();
        localStorage.setItem('darkMode', this.isDarkMode.toString());
    }

    isDarkModeEnabled(): boolean {
        return this.isDarkMode;
    }

    private applyMode(): void {
        const theme = this.isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
    }
}