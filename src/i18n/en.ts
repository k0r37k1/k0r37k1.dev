export default {
	// Navigation & Header
	header: {
		title: 'visitor@k0r37k1.dev:~$ cat portfolio.txt',
	},

	// Hero Section
	hero: {
		greeting: "Hi, I'm",
		name: 'k0r37k1',
		welcome: 'Welcome to my Portfolio where ideas become reality',
		subtitle: 'Vibe Engineer • AI Enthusiast • Problem Solver',
		tagline: 'Vibe Engineer & Digital Craftsman',
		description:
			'I build modern web applications with a focus on performance, accessibility, and clean code.',
		cta: {
			projects: 'View Projects',
			contact: 'Get in Touch',
		},
	},

	// Section Titles
	sections: {
		profile: '▀▄▀▄ PROFILE ▄▀▄▀',
		projects: '▀▄▀▄ PROJECTS ▄▀▄▀',
		skills: '▀▄▀▄ ENVIRONMENT ▄▀▄▀',
		contact: '▀▄▀▄ CONTACT ▄▀▄▀',
		blog: '▀▄▀▄ BLOG ▄▀▄▀',
	},

	// About Section
	about: {
		who: {
			label: '[ WHO ]',
			text: "Alex. I build digital stuff – web, apps, whatever's interesting. Vibe Engineer, because full-stack sounds too boring.",
		},
		what: {
			label: '[ WHAT ]',
			text: "Vue, React, Flutter. AI makes the code faster, I focus on accessibility and performance. Frontend is my thing, but I'm versatile.",
		},
		now: {
			label: '[ NOW ]',
			text: 'Contributing to open source, playing with new web tech, optimizing AI workflows. Always experimenting.',
		},
	},

	// Blog Section
	blog: {
		title: 'Blog',
		description: 'Personal dev blog',
		readMore: 'Read more →',
		publishedOn: 'Published on',
		updatedOn: 'Updated on',
		tags: 'Tags',
		allPosts: 'All Posts',
		noPosts: 'No posts yet.',
		backToBlog: '← back to blog',
	},

	// Projects Section
	projects: {
		viewProject: 'View Project',
		sourceCode: 'Source Code',
		technologies: 'Technologies',
		stack: 'Stack:',
		github: 'GitHub',
		liveDemo: 'Demo',
		store: 'Store',
		items: [
			{
				title: 'Project Alpha',
				description: 'A revolutionary web application built with modern technologies.',
				stack: ['Vue 3', 'TypeScript', 'Tailwind CSS'],
				github: 'https://github.com/yourusername/project-alpha',
				demo: 'https://project-alpha.demo',
			},
			{
				title: 'Project Beta',
				description: 'An innovative solution for real-world problems.',
				stack: ['Astro', 'React', 'Node.js'],
				github: 'https://github.com/yourusername/project-beta',
				demo: null,
			},
			{
				title: 'Project Gamma',
				description: 'A beautiful UI component library for developers.',
				stack: ['Vue 3', 'Vite', 'Storybook'],
				github: 'https://github.com/yourusername/project-gamma',
				demo: 'https://project-gamma.demo',
			},
			{
				title: 'Project Delta',
				description: 'Full-stack application with real-time features.',
				stack: ['TypeScript', 'WebSocket', 'PostgreSQL'],
				github: 'https://github.com/yourusername/project-delta',
				demo: 'https://project-delta.demo',
			},
		],
	},

	// Skills Section
	skills: {
		categories: {
			languages: 'programming languages',
			frameworks: 'frameworks & libraries',
			tools: 'tools & technologies',
			platforms: 'platforms',
			concepts: 'other skills',
		},
		items: {
			web: 'Web',
			ios: 'iOS',
			android: 'Android',
			macos: 'macOS',
			windows: 'Windows',
			linux: 'Linux',
			testing: 'Testing',
			accessibility: 'Accessibility',
		},
	},

	// Contact Section
	contact: {
		title: 'Get in Touch',
		description:
			"Got an idea? Let's talk. Or just say hi on social media. Like what I do? Donations are welcome.",
		email: 'Email',
		github: 'GitHub',
		linkedin: 'LinkedIn',
		form: {
			name: 'Name',
			email: 'Email',
			message: 'Message',
			submit: 'Send Message',
			sending: 'Sending...',
			success: 'Message sent successfully!',
			error: 'Error sending message. Please try again.',
		},
	},

	// Footer
	footer: {
		copyright: '© {year} k0r37k1.dev',
		madeWith: 'Built with',
		links: {
			imprint: 'Imprint',
			privacy: 'Privacy',
			blog: 'Blog',
			home: 'Portfolio',
		},
	},

	// Accessibility / ARIA Labels
	aria: {
		sections: {
			profile: 'Profile',
			projects: 'Projects',
			environment: 'Environment',
			contact: 'Contact',
			blog: 'Blog',
		},
		navigation: {
			legal: 'Legal pages navigation',
			languageSwitcher: {
				switchToGerman: 'Switch to German',
				switchToEnglish: 'Switch to English',
			},
			skipLinks: {
				skipToMain: 'Skip to main content',
				skipToNav: 'Skip to navigation',
			},
		},
		actions: {
			scrollToTop: 'Scroll to top',
			wcagCompliance: 'WCAG 2.2 AA Compliance Guidelines',
		},
	},

	// Cookie Consent
	cookieConsent: {
		consentModal: {
			title: 'We use cookies',
			description:
				'This website uses essential cookies for basic functionality. With your consent, we also use analytics cookies to improve the website.',
			acceptAll: 'Accept all',
			acceptNecessary: 'Necessary only',
			showSettings: 'Manage preferences',
			closeIconLabel: 'Close dialog',
		},
		preferencesModal: {
			title: 'Cookie Preferences',
			acceptAll: 'Accept all',
			acceptNecessary: 'Necessary only',
			save: 'Save preferences',
			closeIconLabel: 'Close modal',
			sections: [
				{
					title: 'Cookie Usage',
					description:
						'We use cookies to ensure basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in or opt-out.',
				},
				{
					title: 'Necessary Cookies <span class="cookie-badge">Always enabled</span>',
					description:
						'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.',
					linkedCategory: 'necessary',
				},
				{
					title: 'Analytics Cookies',
					description:
						'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
					linkedCategory: 'analytics',
				},
				{
					title: 'More Information',
					description:
						'For any questions regarding our cookie policy and your choices, please contact us at <a href="/en/privacy" class="terminal-link">Privacy</a>.',
				},
			],
		},
	},

	// 404 Page
	notFound: {
		title: 'Page not found',
		subtitle: 'The requested page does not exist.',
		description: 'Maybe it was moved, deleted, or you made a typo.',
		backHome: 'back to home',
		backBlog: 'back to blog',
	},

	// Legal Pages
	legal: {
		imprint: {
			title: '▀▄▀▄ IMPRINT ▄▀▄▀',
			tmg: '[ § 5 TMG ]',
			contact: '[ CONTACT ]',
			responsible: '[ § 18 ABS. 2 MSTV ]',
			liability: '[ LIABILITY ]',
			liabilityContent: '// Liability for Content',
			liabilityContentText:
				'The contents of our pages have been created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.',
			liabilityLinks: '// Liability for Links',
			liabilityLinksText:
				'Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for this external content.',
		},
		privacy: {
			title: '▀▄▀▄ PRIVACY ▄▀▄▀',
			lastUpdated: 'Last updated: January 2026',

			// 1. Controller
			responsible: '[ DATA CONTROLLER ]',
			responsibleText: 'The controller responsible for data processing on this website is:',
			responsibleName: 'Alex Korezki',
			responsibleAddress: 'c/o Postflex #10164, Emsdettener Str. 10, 48268 Greven, Germany',
			responsibleEmail: 'Email: contact@k0r37k1.dev',

			// 2. Overview
			overview: '[ OVERVIEW ]',
			overviewText:
				'This privacy policy informs you about the nature, scope and purpose of processing personal data on this website. Personal data is any data that can be used to personally identify you.',

			// 3. Hosting
			hosting: '[ HOSTING ]',
			hostingProvider: '// Hosting Provider',
			hostingProviderText:
				'This website is hosted by netcup GmbH, Daimlerstraße 25, 76185 Karlsruhe, Germany. netcup is a German hosting provider with data centers located in Germany.',
			hostingData: '// Server Log Files',
			hostingDataText:
				'Each time you access this website, information is automatically stored in server log files: IP address (anonymized), browser type and version, operating system, referrer URL, pages accessed, date and time of access.',
			hostingLegal: '// Legal Basis',
			hostingLegalText:
				'Processing is based on Art. 6(1)(f) GDPR (legitimate interest in secure and efficient website operation). Log files are automatically deleted after 7 days.',

			// 4. SSL/TLS
			ssl: '[ SSL/TLS ENCRYPTION ]',
			sslText:
				'This website uses SSL/TLS encryption for security reasons. Certificates are provided by Let\'s Encrypt. You can recognize an encrypted connection by the lock icon in your browser bar and "https://" in the URL.',

			// 5. Cookies
			cookies: '[ COOKIES ]',
			cookiesWhat: '// What are Cookies?',
			cookiesWhatText:
				'Cookies are small text files stored on your device. They cause no harm and contain no viruses.',
			cookiesUsed: '// Cookies Used',
			cookiesUsedText:
				'This website only uses technically necessary cookies for cookie settings. No tracking or analytics cookies are used.',
			cookiesControl: '// Your Control',
			cookiesControlText:
				'You can delete cookies in your browser settings at any time or prevent their storage. Disabling all cookies may limit website functionality.',

			// 6. External Services
			externalServices: '[ EXTERNAL SERVICES ]',
			iconify: '// Iconify (Icons)',
			iconifyText:
				'We use the Iconify API (api.iconify.design) to display icons. When loading icons, your IP address is transmitted to Iconify servers. This is technically necessary to display the icons.',
			iconifyProvider: 'Provider: Iconify OÜ',
			iconifyPrivacy: 'Privacy Policy: https://iconify.design/privacy/',
			iconifyLegal:
				'Legal basis: Art. 6(1)(f) GDPR (legitimate interest in an appealing website presentation).',

			// App Stores
			appStores: '// App Stores',
			appStoresText:
				'This website contains links to my apps in the following app stores. Clicking these links will take you to the respective platforms:',
			appStoresApple: '→ Apple App Store (Apple Inc.)',
			appStoresApplePrivacy: 'Privacy Policy: https://www.apple.com/legal/privacy/',
			appStoresGoogle: '→ Google Play Store (Google LLC)',
			appStoresGooglePrivacy: 'Privacy Policy: https://policies.google.com/privacy',
			appStoresNote:
				'Data processing when visiting these platforms is subject to their respective privacy policies.',

			// Payment Services / Donations
			paymentServices: '// Payment Services & Donations',
			paymentServicesText:
				'This website contains links to the following payment and donation platforms:',
			paymentPaypal: '→ PayPal (PayPal (Europe) S.à r.l. et Cie, S.C.A.)',
			paymentPaypalPrivacy: 'Privacy Policy: https://www.paypal.com/legalhub/privacy-full',
			paymentBuyMeACoffee: '→ Buy Me a Coffee (Publisherr Inc.)',
			paymentBuyMeACoffeePrivacy: 'Privacy Policy: https://www.buymeacoffee.com/privacy-policy',
			paymentServicesNote:
				'When using these services, their respective privacy policies apply. We only receive the data necessary for processing.',

			// 7. Data Transfers to Third Countries
			thirdCountries: '[ DATA TRANSFERS TO THIRD COUNTRIES ]',
			thirdCountriesText: 'Some of the external services we use are based outside the EU/EEA:',
			thirdCountriesIconify: '→ Iconify OÜ (Estonia) - EU Member State',
			thirdCountriesApple: '→ Apple Inc. (USA) - EU-US Data Privacy Framework',
			thirdCountriesGoogle: '→ Google LLC (USA) - EU-US Data Privacy Framework',
			thirdCountriesBuyMeACoffee: '→ Publisherr Inc. (USA) - Standard Contractual Clauses',
			thirdCountriesPaypal: '→ PayPal (Europe) S.à r.l. (Luxembourg) - EU Member State',
			thirdCountriesNote:
				'Data transfers to the USA are based on the EU-US Data Privacy Framework or EU Standard Contractual Clauses pursuant to Art. 46(2)(c) GDPR.',

			// 8. External Links
			externalLinks: '[ EXTERNAL LINKS ]',
			externalLinksText:
				'This website contains links to external websites (e.g., GitHub, X/Twitter). When you click on these links, you leave our website. We have no control over data processing by the linked websites. Please refer to their privacy policies for information.',

			// 9. Your Rights
			rights: '[ YOUR RIGHTS ]',
			rightsIntro: '// Under the GDPR, you have the following rights:',
			rightsInfo: '→ Access to your stored data (Art. 15 GDPR)',
			rightsCorrection: '→ Rectification of inaccurate data (Art. 16 GDPR)',
			rightsDeletion: '→ Erasure of your data (Art. 17 GDPR)',
			rightsRestriction: '→ Restriction of processing (Art. 18 GDPR)',
			rightsPortability: '→ Data portability (Art. 20 GDPR)',
			rightsObject: '→ Object to processing (Art. 21 GDPR)',
			rightsComplaint: '→ Lodge a complaint with a supervisory authority (Art. 77 GDPR)',
			rightsAuthority:
				'Supervisory authority: State Commissioner for Data Protection and Freedom of Information North Rhine-Westphalia, Kavalleriestr. 2-4, 40213 Düsseldorf, Germany',

			// 10. Changes
			changes: '[ CHANGES ]',
			changesText:
				'We reserve the right to update this privacy policy to adapt it to changed legal requirements or changes to our services. The current version is always available on this page. We will inform you appropriately of any significant changes.',

			// 11. Contact
			contact: '[ CONTACT ]',
			contactText:
				'If you have any questions about data protection, you can contact us at any time:',
		},
		nav: {
			backToPortfolio: '← back to portfolio',
			toImprint: 'imprint →',
			toPrivacy: 'privacy →',
		},
	},
} as const;
