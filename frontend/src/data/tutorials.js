export const appInstallationTutorial = {
    title: 'Apps installieren',
    steps: [
        {
            screenType: 'home',
            description: 'Suche auf deinem Startbildschirm nach dem blauen "App Store" Symbol.',
            screenText: 'App Store',
            highlightedElement: 'App Store',
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg',
            showTabBar: false  // Kein Tab Bar im Home Screen
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
            showTabBar: false  // Kein Tab Bar im Home Screen
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
];
