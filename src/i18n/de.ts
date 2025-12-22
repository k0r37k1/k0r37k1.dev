export default {
	// Navigation & Header
	header: {
		title: 'visitor@k0r37k1.dev:~$ cat portfolio.txt',
	},

	// Hero Section
	hero: {
		greeting: 'Hi, ich bin',
		name: 'k0r37k1',
		welcome: 'Willkommen zu meinem Portfolio, wo Ideen Realität werden',
		subtitle: 'Vibe Engineer • KI-Enthusiast • Problem-Löser',
		tagline: 'Vibe Engineer & Digital Craftsman',
		description:
			'Ich entwickle moderne Webanwendungen mit Fokus auf Performance, Barrierefreiheit und Clean Code.',
		cta: {
			projects: 'Projekte ansehen',
			contact: 'Kontakt aufnehmen',
		},
	},

	// Section Titles
	sections: {
		profile: '▀▄▀▄ PROFIL ▄▀▄▀',
		projects: '▀▄▀▄ PROJEKTE ▄▀▄▀',
		skills: '▀▄▀▄ ENTWICKLUNGSUMGEBUNG ▄▀▄▀',
		contact: '▀▄▀▄ KONTAKT ▄▀▄▀',
	},

	// About Section
	about: {
		who: {
			label: '[ WER ]',
			text: 'Alex. Ich baue digitale Sachen – Web, Apps, was gerade interessant ist. Vibe Engineer, weil Full-Stack zu langweilig klingt.',
		},
		what: {
			label: '[ WAS ]',
			text: 'Vue, React, Flutter. AI macht den Code schneller, ich achte auf Barrierefreiheit und Performance. Frontend ist mein Ding, aber ich bin vielseitig unterwegs.',
		},
		now: {
			label: '[ JETZT ]',
			text: 'Open Source beitragen, mit neuen Web-Technologien spielen, AI-Workflows optimieren. Immer am Experimentieren.',
		},
	},

	// Projects Section
	projects: {
		viewProject: 'Projekt ansehen',
		sourceCode: 'Source Code',
		technologies: 'Technologien',
		stack: 'Stack:',
		github: 'GitHub',
		liveDemo: 'Demo',
		store: 'Store',
		items: [
			{
				title: 'Project Alpha',
				description: 'Eine revolutionäre Webanwendung, gebaut mit modernen Technologien.',
				stack: ['Vue 3', 'TypeScript', 'Tailwind CSS'],
				github: 'https://github.com/yourusername/project-alpha',
				demo: 'https://project-alpha.demo',
			},
			{
				title: 'Project Beta',
				description: 'Eine innovative Lösung für reale Probleme.',
				stack: ['Astro', 'React', 'Node.js'],
				github: 'https://github.com/yourusername/project-beta',
				demo: null,
			},
			{
				title: 'Project Gamma',
				description: 'Eine schöne UI-Komponentenbibliothek für Entwickler.',
				stack: ['Vue 3', 'Vite', 'Storybook'],
				github: 'https://github.com/yourusername/project-gamma',
				demo: 'https://project-gamma.demo',
			},
			{
				title: 'Project Delta',
				description: 'Full-Stack-Anwendung mit Echtzeit-Features.',
				stack: ['TypeScript', 'WebSocket', 'PostgreSQL'],
				github: 'https://github.com/yourusername/project-delta',
				demo: 'https://project-delta.demo',
			},
		],
	},

	// Skills Section
	skills: {
		categories: {
			languages: 'Programmiersprachen',
			frameworks: 'Frameworks & Bibliotheken',
			tools: 'Tools & Technologien',
			platforms: 'Plattformen',
			concepts: 'Weitere Kompetenzen',
		},
		items: {
			desktop: 'Desktop',
			mobile: 'Mobil',
			testing: 'Testing',
			accessibility: 'Barrierefreiheit',
			restfulApi: 'RESTful API',
		},
	},

	// Contact Section
	contact: {
		title: 'Lass uns zusammenarbeiten',
		description:
			'Projekt im Kopf? Lass uns reden. Oder schreib mir einfach auf Social Media. Gefällt dir, was ich mache? Spenden sind willkommen.',
		email: 'E-Mail',
		github: 'GitHub',
		linkedin: 'LinkedIn',
		form: {
			name: 'Name',
			email: 'E-Mail',
			message: 'Nachricht',
			submit: 'Nachricht senden',
			sending: 'Wird gesendet...',
			success: 'Nachricht erfolgreich gesendet!',
			error: 'Fehler beim Senden. Bitte versuche es erneut.',
		},
	},

	// Footer
	footer: {
		copyright: '© {year} k0r37k1.dev',
		madeWith: 'Entwickelt mit',
		links: {
			imprint: 'Impressum',
			privacy: 'Datenschutz',
			wcag: 'WCAG 2.2 AA',
		},
	},

	// Accessibility / ARIA Labels
	aria: {
		sections: {
			profile: 'Profil',
			projects: 'Projekte',
			environment: 'Entwicklungsumgebung',
			contact: 'Kontakt',
		},
		navigation: {
			legal: 'Navigation für rechtliche Seiten',
			languageSwitcher: {
				switchToGerman: 'Zu Deutsch wechseln',
				switchToEnglish: 'Zu Englisch wechseln',
			},
			skipLinks: {
				skipToMain: 'Direkt zum Hauptinhalt springen',
				skipToNav: 'Direkt zur Navigation springen',
			},
		},
		actions: {
			scrollToTop: 'Nach oben scrollen',
			wcagCompliance: 'WCAG 2.2 AA Konformität Richtlinien',
		},
	},

	// Cookie Consent
	cookieConsent: {
		consentModal: {
			title: 'Wir verwenden Cookies',
			description:
				'Diese Website nutzt essentielle Cookies für grundlegende Funktionen. Mit Ihrer Zustimmung verwenden wir auch Analyse-Cookies zur Verbesserung der Website.',
			acceptAll: 'Alle akzeptieren',
			acceptNecessary: 'Nur notwendige',
			showSettings: 'Einstellungen verwalten',
			closeIconLabel: 'Dialog schließen',
		},
		preferencesModal: {
			title: 'Cookie-Einstellungen',
			acceptAll: 'Alle akzeptieren',
			acceptNecessary: 'Nur notwendige',
			save: 'Einstellungen speichern',
			closeIconLabel: 'Modal schließen',
			sections: [
				{
					title: 'Cookie-Verwendung',
					description:
						'Wir verwenden Cookies, um die grundlegenden Funktionen der Website zu gewährleisten und Ihr Online-Erlebnis zu verbessern. Sie können für jede Kategorie wählen, ob Sie sich an- oder abmelden möchten.',
				},
				{
					title: 'Notwendige Cookies <span class="cookie-badge">Immer aktiv</span>',
					description:
						'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Ohne diese Cookies würde die Website nicht richtig funktionieren.',
					linkedCategory: 'necessary',
				},
				{
					title: 'Analyse-Cookies',
					description:
						'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie anonyme Informationen sammeln und melden.',
					linkedCategory: 'analytics',
				},
				{
					title: 'Weitere Informationen',
					description:
						'Bei Fragen zu unserer Cookie-Richtlinie und Ihren Wahlmöglichkeiten kontaktieren Sie uns bitte unter <a href="/privacy" class="terminal-link">Datenschutz</a>.',
				},
			],
		},
	},

	// Legal Pages
	legal: {
		imprint: {
			title: '▀▄▀▄ IMPRESSUM ▄▀▄▀',
			tmg: '[ § 5 TMG ]',
			contact: '[ KONTAKT ]',
			responsible: '[ § 55 ABS. 2 RSTV ]',
			liability: '[ HAFTUNG ]',
			liabilityContent: '// Haftung für Inhalte',
			liabilityContentText:
				'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
			liabilityLinks: '// Haftung für Links',
			liabilityLinksText:
				'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.',
		},
		privacy: {
			title: '▀▄▀▄ DATENSCHUTZ ▄▀▄▀',
			overview: '[ ÜBERBLICK ]',
			overviewText:
				'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.',
			dataCollection: '[ DATENERFASSUNG ]',
			whoResponsible: '// Wer ist verantwortlich?',
			whoResponsibleText:
				'Die Datenverarbeitung auf dieser Website erfolgt durch den Website-Betreiber. Die Kontaktdaten können Sie dem Impressum dieser Website entnehmen.',
			howCollect: '// Wie erfassen wir Ihre Daten?',
			howCollectText:
				'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.',
			howCollectText2:
				'Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Webbrowser, Betriebssystem oder Zeitpunkt des Seitenaufrufs).',
			hosting: '[ HOSTING ]',
			hostingText:
				'Diese Website wird von einem externen Dienstleister (Hoster) gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.',
			cookies: '[ COOKIES ]',
			cookiesText:
				'Unsere Website verwendet sogenannte "Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.',
			rights: '[ IHRE RECHTE ]',
			rightsIntro: '// Sie haben folgende Rechte:',
			rightsInfo: '→ Auskunft über Ihre gespeicherten Daten und deren Verarbeitung',
			rightsCorrection: '→ Berichtigung unrichtiger personenbezogener Daten',
			rightsDeletion: '→ Löschung Ihrer bei uns gespeicherten Daten',
			rightsRestriction: '→ Einschränkung der Datenverarbeitung',
			rightsPortability: '→ Datenübertragbarkeit',
			rightsObject: '→ Widerspruch gegen die Verarbeitung',
			contact: '[ KONTAKT ]',
			contactText: 'Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.',
		},
		nav: {
			backToPortfolio: '← zurück zum Portfolio',
			toImprint: 'Impressum →',
			toPrivacy: 'Datenschutz →',
		},
	},
} as const;
