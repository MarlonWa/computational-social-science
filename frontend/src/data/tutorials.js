export const appInstallationTutorial = {
    title: 'Apps installieren',
    steps: [
        {
            screenType: 'home',
            description: 'Suche auf deinem Startbildschirm nach dem blauen "App Store" Symbol.',
            screenText: 'App Store',
            highlightedElement: 'App Store',
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg',
            showTabBar: false  
        },
        {
            screenType: 'search_tab',
            description: 'Tippe unten rechts auf die Lupe "Suchen".',
            screenText: 'Suchen',
            highlightedElement: 'Suchen'
        },
        {
            screenType: 'search_input',
            description: 'Tippe oben in das Suchfeld "Facebook" ein.',
            screenText: 'Facebook eingeben',
            highlightedElement: 'Suchfeld'
        },
        {
            screenType: 'app_detail',
            description: 'Tippe auf "LADEN" neben dem Facebook Logo.',
            appName: 'Facebook',
            appDev: 'Meta Platforms, Inc.',
            highlightedElement: 'Laden',
            appIcon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg'
        },
        {
            screenType: 'app_installing',
            description: 'Die App wird jetzt heruntergeladen. Warte einen Moment.',
            appName: 'Facebook',
            highlightedElement: 'Installieren...',
            appIcon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
            appDev: 'Meta Platforms, Inc.'
        },
        {
            screenType: 'app_installed',
            description: 'Fertig! Die App ist jetzt installiert. Du kannst sie öffnen.',
            appName: 'Facebook',
            highlightedElement: 'Öffnen',
            appIcon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
            appDev: 'Meta Platforms, Inc.'
        },
        {
            screenType: 'home_with_facebook',
            description: 'Perfekt! Facebook ist jetzt auf deinem Startbildschirm und du kannst es jederzeit öffnen.',
            screenText: 'Fertig',
            highlightedElement: 'Facebook',
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg',
            appIcon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
            showTabBar: false  
        }
    ],
};

export const appUninstallTutorial = {
    title: 'App deinstallieren',
    steps: [
        {
            screenType: 'home_with_facebook',
            description: 'Suche die App, die du löschen möchtest, auf deinem Startbildschirm. Hier am Beispiel: Facebook.',
            screenText: 'Facebook',
            highlightedElement: 'Facebook',
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg',
            appIcon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
            showTabBar: false
        },
        {
            screenType: 'long_press',
            description: 'Halte dein Finger lange auf dem Facebook Icon gedrückt, bis ein Menü erscheint.',
            screenText: 'Lange drücken',
            highlightedElement: 'Facebook',
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg',
            appIcon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
            showTabBar: false
        },
        {
            screenType: 'context_menu',
            description: 'Tippe auf "App entfernen" im Menü.',
            screenText: 'App entfernen',
            highlightedElement: 'App entfernen',
            appIcon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
            showTabBar: false
        },
        {
            screenType: 'confirm_delete',
            description: 'Bestätige mit "App löschen" um die App zu entfernen.',
            screenText: 'App löschen',
            highlightedElement: 'App löschen',
            appName: 'Facebook',
            appIcon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
            showTabBar: false
        },
        {
            screenType: 'deleting',
            description: 'Die App wird jetzt vom Gerät gelöscht. Das dauert nur einen Moment.',
            screenText: 'Wird gelöscht...',
            highlightedElement: 'Löschen',
            appIcon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
            showTabBar: false
        },
        {
            screenType: 'home',
            description: 'Fertig! Facebook wurde entfernt. Der Platz auf deinem Startbildschirm ist wieder frei.',
            screenText: 'Erfolgreich gelöscht',
            highlightedElement: 'App Store',
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg',
            showTabBar: false
        }
    ],
};

export const wifiConnectionTutorial = {
    title: 'Mit WLAN verbinden',
    steps: [
        {
            screenType: 'home',
            description: 'Suche auf deinem Startbildschirm nach dem "Einstellungen" Symbol (graues Zahnrad).',
            screenText: 'Einstellungen',
            highlightedElement: 'Einstellungen',
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Settings_%28iOS%29.png',
            showTabBar: false
        },
        {
            screenType: 'settings',
            description: 'Tippe oben auf "WLAN" um die WLAN-Einstellungen zu öffnen.',
            screenText: 'WLAN',
            highlightedElement: 'WLAN',
            showTabBar: false
        },
        {
            screenType: 'wifi_off',
            description: 'Falls WLAN ausgeschaltet ist, tippe auf den Schalter um es einzuschalten.',
            screenText: 'WLAN einschalten',
            highlightedElement: 'WLAN-Schalter',
            showTabBar: false
        },
        {
            screenType: 'wifi_list',
            description: 'Wähle dein WLAN-Netzwerk aus der Liste aus. Tippe auf den Namen.',
            screenText: 'Netzwerk auswählen',
            highlightedElement: 'MeinWLAN',
            wifiNetworks: ['MeinWLAN', 'Nachbar-WLAN', 'Gast-Netz'],
            showTabBar: false
        },
        {
            screenType: 'wifi_password',
            description: 'Gib das WLAN-Passwort ein. Du findest es meist auf deinem Router.',
            screenText: 'Passwort eingeben',
            highlightedElement: 'Passwort-Feld',
            showTabBar: false
        },
        {
            screenType: 'wifi_connecting',
            description: 'Das Gerät verbindet sich jetzt mit dem WLAN. Warte einen Moment.',
            screenText: 'Verbinden...',
            highlightedElement: 'Verbinden',
            networkName: 'MeinWLAN',
            showTabBar: false
        },
        {
            screenType: 'wifi_connected',
            description: 'Perfekt! Du bist jetzt mit dem WLAN verbunden. Das Häkchen zeigt eine erfolgreiche Verbindung.',
            screenText: 'Verbunden',
            highlightedElement: 'Verbunden',
            networkName: 'MeinWLAN',
            showTabBar: false
        }
    ],
};

export const passwordTutorial = {
    title: 'Sicheres Passwort',
    steps: [
        {
            screenType: 'password_login_mask',
            description: 'Du siehst eine Registrierungs-Maske, wie bei einer Bank oder E-Mail. Hier kannst du ein neues Passwort testen.',
            screenText: 'Registrieren',
            highlightedElement: 'Passwort-Feld',
            isRegistration: true,
            showTabBar: false
        },
        {
            screenType: 'password_tester',
            description: 'Tippe verschiedene Passwörter ein! Schau, wie sich der Balken und die Anforderungen verändern. Ein gutes Passwort ist mindestens 8 Zeichen mit Zahl und Sonderzeichen!',
            screenText: 'Passwort-Tester',
            highlightedElement: 'Test-Input',
            showTabBar: false
        },
        {
            screenType: 'password_eye_symbol',
            description: 'Siehst du das kleine Auge-Symbol? Klick drauf, um dein Passwort zu sehen. Das hilft gegen Tippfehler!',
            screenText: 'Auge-Symbol',
            highlightedElement: 'Auge',
            showEyeSymbol: true,
            showTabBar: false
        },
        {
            screenType: 'password_final_success',
            description: 'Perfekt! Du weißt jetzt, wie sichere Passwörter funktionieren. Mindestens 8 Zeichen mit Großbuchstaben, Zahlen und Sonderzeichen!',
            screenText: 'Geschafft!',
            highlightedElement: 'Erfolgreich',
            showTabBar: false
        }
    ],
};

export const tutorials = [
    {
        id: 'app-installation',
        title: 'Apps installieren',
        description: 'Lerne wie du neue Apps auf dein iPhone/iPad installierst',
        tutorial: appInstallationTutorial,
    },
    {
        id: 'app-uninstall',
        title: 'App deinstallieren',
        description: 'Lerne wie du Apps von deinem Gerät entfernst',
        tutorial: appUninstallTutorial,
    },
    {
        id: 'wifi-connection',
        title: 'Mit WLAN verbinden',
        description: 'Lerne wie du dich mit einem WLAN-Netzwerk verbindest',
        tutorial: wifiConnectionTutorial,
    },
    {
        id: 'password-security',
        title: 'Sicheres Passwort',
        description: 'Lerne, wie du deine Konten schützt.',
        tutorial: passwordTutorial,
    },
];
