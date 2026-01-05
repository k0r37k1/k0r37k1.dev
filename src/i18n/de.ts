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
		blog: '▀▄▀▄ BLOG ▄▀▄▀',
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

	// Blog Section
	blog: {
		title: 'Blog',
		description: 'Persönliches Dev-Blog',
		readMore: 'Weiterlesen →',
		publishedOn: 'Veröffentlicht am',
		updatedOn: 'Aktualisiert am',
		tags: 'Tags',
		allPosts: 'Alle Beiträge',
		noPosts: 'Noch keine Beiträge vorhanden.',
		backToBlog: '← zurück zum Blog',
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
		imageAlt: 'Screenshot von {title}',
		items: [
			{
				title: 'k0r37k1.dev',
				description:
					'Mein persönliches Portfolio – moderner Tech-Stack, neo-brutalistisches Design. Barrierefrei, DE/EN.',
				stack: ['Astro', 'Vue', 'Motion', 'Tailwind', 'CSS'],
				image: '/images/projects/k0r37k1-dev.png',
				github: 'https://github.com/k0r37k1/k0r37k1.dev',
				demo: 'https://k0r37k1.dev',
			},
			{
				title: 'DoZzzy',
				description:
					'Minimalistischer Nap Timer für Android. Timer bis 3h, Presets, anpassbarer Alarm mit Snooze. Barrierefrei, DE/EN.',
				stack: ['Flutter', 'Dart', 'Riverpod'],
				store: 'https://play.google.com/store',
			},
			{
				title: 'Plain Text Editor',
				description:
					'Minimalistischer Texteditor für Android. Fokus-Modus, Typewriter-Modus, Schrifteinstellungen, Auto-Save. Barrierefrei, DE/EN.',
				stack: ['Flutter', 'Dart'],
				store: 'https://play.google.com/store',
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
			web: 'Web',
			ios: 'iOS',
			android: 'Android',
			macos: 'macOS',
			windows: 'Windows',
			linux: 'Linux',
			testing: 'Testing',
			accessibility: 'Barrierefreiheit',
		},
	},

	// Contact Section
	contact: {
		title: 'Sag Hallo',
		description:
			'Idee im Kopf? Lass uns reden. Oder schreib mir einfach auf Social Media. Gefällt dir, was ich mache? Spenden sind willkommen.',
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
			blog: 'Blog',
			home: 'Portfolio',
		},
	},

	// Accessibility / ARIA Labels
	aria: {
		sections: {
			profile: 'Profil',
			projects: 'Projekte',
			environment: 'Entwicklungsumgebung',
			contact: 'Kontakt',
			blog: 'Blog',
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

	// 404 Page
	notFound: {
		title: 'Seite nicht gefunden',
		subtitle: 'Die angeforderte Seite existiert nicht.',
		description: 'Vielleicht wurde sie verschoben, gelöscht oder du hast dich vertippt.',
		backHome: 'zur Startseite',
		backBlog: 'zum Blog',
	},

	// Legal Pages
	legal: {
		imprint: {
			title: '▀▄▀▄ IMPRESSUM ▄▀▄▀',
			tmg: '[ § 5 TMG ]',
			contact: '[ KONTAKT ]',
			responsible: '[ § 18 ABS. 2 MSTV ]',
			vat: '[ UMSATZSTEUER ]',
			vatText: 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).',
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
			lastUpdated: 'Stand: Januar 2026',

			// 1. Verantwortlicher
			responsible: '[ VERANTWORTLICHER ]',
			responsibleText: 'Verantwortlich für die Datenverarbeitung auf dieser Website ist:',
			responsibleName: 'Alex Korezki',
			responsibleAddress: 'c/o Postflex #10164, Emsdettener Str. 10, 48268 Greven',
			responsibleEmail: 'E-Mail:',

			// 2. Überblick
			overview: '[ ÜBERBLICK ]',
			overviewText:
				'Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf dieser Website. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.',

			// 3. Hosting
			hosting: '[ HOSTING ]',
			hostingProvider: '// Hoster',
			hostingProviderText:
				'Diese Website wird bei netcup GmbH, Daimlerstraße 25, 76185 Karlsruhe, Deutschland gehostet. netcup ist ein deutscher Hosting-Anbieter mit Rechenzentren in Deutschland.',
			hostingData: '// Server-Logfiles',
			hostingDataText:
				'Bei jedem Zugriff auf diese Website werden automatisch Informationen in Server-Logfiles gespeichert: IP-Adresse (anonymisiert), Browsertyp und -version, Betriebssystem, Referrer-URL, aufgerufene Seiten, Datum und Uhrzeit des Zugriffs.',
			hostingLegal: '// Rechtsgrundlage',
			hostingLegalText:
				'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und effizienten Websitebetrieb). Die Logfiles werden nach 7 Tagen automatisch gelöscht.',

			// 4. SSL/TLS
			ssl: '[ SSL/TLS-VERSCHLÜSSELUNG ]',
			sslText:
				'Diese Website nutzt aus Sicherheitsgründen eine SSL/TLS-Verschlüsselung. Die Zertifikate werden von Let\'s Encrypt bereitgestellt. Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in der Browserzeile und an "https://" in der URL.',

			// 5. Cookies
			cookies: '[ COOKIES ]',
			cookiesWhat: '// Was sind Cookies?',
			cookiesWhatText:
				'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden. Sie richten keinen Schaden an und enthalten keine Viren.',
			cookiesUsed: '// Verwendete Cookies',
			cookiesUsedText:
				'Diese Website verwendet ausschließlich technisch notwendige Cookies für die Cookie-Einstellungen. Es werden keine Tracking- oder Analyse-Cookies eingesetzt.',
			cookiesControl: '// Ihre Kontrolle',
			cookiesControlText:
				'Sie können Cookies in Ihren Browsereinstellungen jederzeit löschen oder deren Speicherung verhindern. Bei Deaktivierung aller Cookies kann die Funktionalität der Website eingeschränkt sein.',

			// 6. Externe Dienste
			externalServices: '[ EXTERNE DIENSTE ]',
			iconify: '// Iconify (Icons)',
			iconifyText:
				'Für die Darstellung von Icons nutzen wir die Iconify API (api.iconify.design). Beim Laden der Icons wird Ihre IP-Adresse an die Server von Iconify übermittelt. Dies ist technisch notwendig, um die Icons anzuzeigen.',
			iconifyProvider: 'Anbieter: Iconify OÜ',
			iconifyPrivacy: 'Datenschutz: https://iconify.design/privacy/',
			iconifyLegal:
				'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer ansprechenden Darstellung der Website).',

			// App Stores
			appStores: '// App Stores',
			appStoresText:
				'Diese Website enthält Links zu meinen Apps in den folgenden App Stores. Bei Klick auf diese Links gelangen Sie zu den jeweiligen Plattformen:',
			appStoresApple: '→ Apple App Store (Apple Inc.)',
			appStoresApplePrivacy: 'Datenschutz: https://www.apple.com/legal/privacy/',
			appStoresGoogle: '→ Google Play Store (Google LLC)',
			appStoresGooglePrivacy: 'Datenschutz: https://policies.google.com/privacy',
			appStoresNote:
				'Die Datenverarbeitung beim Besuch dieser Plattformen unterliegt deren jeweiligen Datenschutzbestimmungen.',

			// Zahlungsdienste / Spenden
			paymentServices: '// Zahlungsdienste & Spenden',
			paymentServicesText:
				'Diese Website enthält Links zu folgenden Zahlungs- und Spendenplattformen:',
			paymentPaypal: '→ PayPal (PayPal (Europe) S.à r.l. et Cie, S.C.A.)',
			paymentPaypalPrivacy: 'Datenschutz: https://www.paypal.com/de/legalhub/privacy-full',
			paymentBuyMeACoffee: '→ Buy Me a Coffee (Publisherr Inc.)',
			paymentBuyMeACoffeePrivacy: 'Datenschutz: https://www.buymeacoffee.com/privacy-policy',
			paymentServicesNote:
				'Bei Nutzung dieser Dienste gelten deren jeweilige Datenschutzbestimmungen. Wir erhalten nur die für die Abwicklung notwendigen Daten.',

			// 7. Datenübermittlung in Drittländer
			thirdCountries: '[ DATENÜBERMITTLUNG IN DRITTLÄNDER ]',
			thirdCountriesText:
				'Einige der von uns genutzten externen Dienste haben ihren Sitz außerhalb der EU/des EWR:',
			thirdCountriesIconify: '→ Iconify OÜ (Estland) - EU-Mitgliedstaat',
			thirdCountriesApple: '→ Apple Inc. (USA) - EU-US Data Privacy Framework',
			thirdCountriesGoogle: '→ Google LLC (USA) - EU-US Data Privacy Framework',
			thirdCountriesBuyMeACoffee: '→ Publisherr Inc. (USA) - Standardvertragsklauseln',
			thirdCountriesPaypal: '→ PayPal (Europe) S.à r.l. (Luxemburg) - EU-Mitgliedstaat',
			thirdCountriesNote:
				'Die Datenübermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO.',

			// 8. Externe Links
			externalLinks: '[ EXTERNE LINKS ]',
			externalLinksText:
				'Diese Website enthält Links zu externen Websites (z. B. GitHub, X/Twitter). Bei Klick auf diese Links verlassen Sie unsere Website. Wir haben keinen Einfluss auf die Datenverarbeitung durch die verlinkten Websites. Bitte informieren Sie sich dort über deren Datenschutzbestimmungen.',

			// 9. Ihre Rechte
			rights: '[ IHRE RECHTE ]',
			rightsIntro: '// Nach der DSGVO haben Sie folgende Rechte:',
			rightsInfo: '→ Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)',
			rightsCorrection: '→ Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
			rightsDeletion: '→ Löschung Ihrer Daten (Art. 17 DSGVO)',
			rightsRestriction: '→ Einschränkung der Verarbeitung (Art. 18 DSGVO)',
			rightsPortability: '→ Datenübertragbarkeit (Art. 20 DSGVO)',
			rightsObject: '→ Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
			rightsComplaint: '→ Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)',
			rightsAuthority:
				'Zuständige Aufsichtsbehörde: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestr. 2-4, 40213 Düsseldorf',

			// 10. Änderungen
			changes: '[ ÄNDERUNGEN ]',
			changesText:
				'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder bei Änderungen des Dienstes anzupassen. Die aktuelle Version finden Sie stets auf dieser Seite. Bei wesentlichen Änderungen werden wir Sie in geeigneter Weise informieren.',

			// 11. Kontakt
			contact: '[ KONTAKT ]',
			contactText: 'Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:',
		},
		nav: {
			backToPortfolio: '← zurück zum Portfolio',
			toImprint: 'Impressum →',
			toPrivacy: 'Datenschutz →',
		},
	},
} as const;
